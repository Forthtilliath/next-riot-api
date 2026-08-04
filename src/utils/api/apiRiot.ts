import Axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';

import { DEFAULT_LOCALE_FULL, LANGUAGES } from '../constantes';
import { shuffle } from '../methods/array';

const BASE_URL_DDRAGON = 'https://ddragon.leagueoflegends.com';
const BASE_URL_STATIC = 'https://static.developer.riotgames.com';

const apiRiot = setupCache(
  Axios.create({
    baseURL: BASE_URL_DDRAGON,
  }),
);

const apiStatic = setupCache(
  Axios.create({
    baseURL: BASE_URL_STATIC,
  }),
);

async function fetchDdragon<T>(route: string, id: string, ttl?: number) {
  return await apiRiot
    .get<T>(route, { id, cache: ttl ? { ttl } : undefined })
    .then((res) => res.data)
    .catch(() => null);
}

async function fetchStatic<T>(route: string, id: string) {
  return await apiStatic
    .get<T>(route, { id })
    .then((res) => res.data)
    .catch(() => null);
}

/** Retourne la liste des versions disponibles, la plus récente en premier */
export async function getVersions() {
  return await fetchDdragon<string[]>('/api/versions.json', 'versions');
}

/** Retourne la liste des langues disponibles */
// export async function getLanguages() {
//   return await fetchDdragon<string[]>('/cdn/languages.json', 'languages');
// }

/** Retourne la liste des langues disponibles */
// export async function getMaps() {
//   return await fetchStatic<MapLol[]>('/docs/lol/maps.json', 'maps');
// }

/**
 * Retourne la dernière version disponible du jeu. Mise en cache 1h (les
 * patchs sortent toutes les 2 semaines, pas besoin de revérifier plus souvent)
 * avec un repli sur une version connue si l'API est indisponible.
 */
export async function getLatestVersion() {
  const versions = await fetchDdragon<string[]>('/api/versions.json', 'versions', 60 * 60 * 1000);
  return versions?.[0] ?? FALLBACK_VERSION;
}

/** Utilisée uniquement si l'endpoint /api/versions.json est injoignable */
const FALLBACK_VERSION = '15.1.1';

/**
 * Retourne la liste des champions disponible. Les informations retournées
 * dépendent de la version du jeu ainsi que de la langue
 */
export async function getChampions(locale: string) {
  const lang = LANGUAGES.find((lang) => lang.locale === locale)?.locale_full ?? DEFAULT_LOCALE_FULL;
  const version = await getLatestVersion();

  return await fetchDdragon<{ data: Record<string, Champion> }>(
    `/cdn/${version}/data/${lang}/champion.json`,
    `${locale}-champions-${version}`,
  )
    .then((res) => res?.data || {})
    // Example : AurelionSol => aurelionsol
    .then((res) => Object.entries(res))
    // On met toutes les clés en minuscules
    .then((res) => res.map<[string, Champion]>(([key, val]) => [key.toLowerCase(), val]))
    .then((res) => Object.fromEntries(res));
}

/**
 * Retourne la liste des skins d'un champion (numéro + image loading/centered),
 * à partir de l'endpoint détaillé (le seul à exposer les skins).
 */
async function getChampionSkins(locale: string, version: string, champion: Champion) {
  const lang = LANGUAGES.find((lang) => lang.locale === locale)?.locale_full ?? DEFAULT_LOCALE_FULL;

  const detail = await fetchDdragon<{ data: Record<string, { skins: ChampionSkin[] }> }>(
    `/cdn/${version}/data/${lang}/champion/${champion.id}.json`,
    `${locale}-champion-${champion.id}-${version}`,
  );

  const skins = detail?.data?.[champion.id]?.skins ?? [{ id: '0', num: 0, name: 'default', chromas: false }];

  return skins.map((skin) => ({
    num: skin.num,
    name: skin.name,
    loadingUrl: `${BASE_URL_DDRAGON}/cdn/img/champion/loading/${champion.id}_${skin.num}.jpg`,
    centeredUrl: `https://cdn.communitydragon.org/latest/champion/${champion.id}/splash-art/centered/skin/${skin.num}`,
  }));
}

export async function getChampion(locale: string, name: string) {
  const version = await getLatestVersion();
  const champions = await getChampions(locale);

  // Si pas d'objets ou objet non trouvé
  if (!champions || !champions?.[name]) return null;
  const champion = champions[name];

  const champs = shuffle(Object.values(champions));

  // Récupère 10 champions avec au moins un des tags du champion à afficher
  let championsFiltered = new Map<string, Champion>();
  champs.every((champ) => {
    champ.tags.forEach((tag) => {
      if (champion.tags.includes(tag) && !championsFiltered.has(champ.id)) {
        championsFiltered.set(champ.id, champ);
      }
    });
    return championsFiltered.size < 10;
  });

  const skins = await getChampionSkins(locale, version, champion);

  return {
    ...champion,
    skins,
    moreChampions: Array.from(championsFiltered).map(([, champ]) => champ),
  } as ChampionDetails;
}

/**
 * Retourne la liste des objets disponible. Les informations retournées
 * dépendent de la version du jeu ainsi que de la langue
 */
export async function getItems(locale: string) {
  const lang = LANGUAGES.find((lang) => lang.locale === locale)?.locale_full ?? DEFAULT_LOCALE_FULL;
  const version = await getLatestVersion();

  return await fetchDdragon<{ data: Items }>(
    `/cdn/${version}/data/${lang}/item.json`,
    `${locale}-items-${version}`,
  )
    .then((res) => res?.data || {})
    .then((res) => Object.entries(res))
    .then((res) => res.map<[string, Item]>(([id, item]) => [id, { ...item, version }]))
    .then((res) => Object.fromEntries(res));
}

export async function getItem(
  locale: string,
  id: string,
  parent = true,
): Promise<ItemWithId | ItemDetails | null> {
  const items = await getItems(locale);

  // Si pas d'objets ou objet non trouvé
  if (!items || !items?.[id]) return null;

  const item = items[id];

  // On évite de récupérer les from de from de from. On veut juste ceux de l'item affiché
  if (!parent) return { id, ...item };

  const from: Awaited<Array<ItemWithId>> = await Promise.all(
    item?.from?.map(async (itemId) => ({
      id: itemId,
      ...((await getItem(locale, itemId, false)) as Item),
    })) ?? [],
  );
  const into: Awaited<Array<ItemWithId>> = await Promise.all(
    item?.into?.map(async (itemId) => ({
      id: itemId,
      ...((await getItem(locale, itemId, false)) as Item),
    })) ?? [],
  );

  return {
    id,
    ...item,
    from,
    into,
  };
}
