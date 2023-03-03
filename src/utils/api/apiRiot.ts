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

const options = {
  language: 'fr_FR',
  version: '13.3.1',
};

async function fetchDdragon<T>(route: string, id: string) {
  return await apiRiot
    .get<T>(route, { id })
    .then((res) => res.data)
    .catch((err) => {
      // console.error(err);
      // return [] as T;
      return null;
    });
}

async function fetchStatic<T>(route: string, id: string) {
  return await apiStatic
    .get<T>(route, { id })
    .then((res) => res.data)
    .catch((err) => {
      // console.error(err);
      // return [] as T;
      return null;
    });
}

/** Retourne la liste des versions disponibles  */
export async function getVersions() {
  return await fetchDdragon<string[]>('/api/versions.json', 'versions');
}

/** Retourne la liste des langues disponibles */
export async function getLanguages() {
  return await fetchDdragon<string[]>('/cdn/languages.json', 'languages');
}

/** Retourne la liste des langues disponibles */
export async function getMaps() {
  return await fetchStatic<MapLol[]>('/docs/lol/maps.json', 'maps');
}

/** Retourne la dernière version disponible */
export async function getLastVersion() {
  return await getVersions().then((res) => res?.[0] || null);
}

/**
 * Retourne la liste des champions disponible. Les informations retournées
 * dépendent de la version du jeu ainsi que de la langue
 */
export async function getChampions(locale: string) {
  const lang = LANGUAGES.find((lang) => lang.locale === locale)?.locale_full ?? DEFAULT_LOCALE_FULL;

  return await fetchDdragon<{ data: Record<string, Champion> }>(
    `/cdn/${options.version}/data/${lang}/champion.json`,
    `${locale}-champions`,
  )
    .then((res) => res?.data || {})
    // Example : AurelionSol => aurelionsol
    .then((res) => Object.entries(res))
    // On met toutes les clés en minuscules
    .then((res) => res.map<[string, Champion]>(([key, val]) => [key.toLowerCase(), val]))
    .then((res) => Object.fromEntries(res));
}

export async function getChampion(locale: string, name: string) {
  // ): Promise<Champion | null> {
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

  return {
    ...champion,
    moreChampions: Array.from(championsFiltered).map(([, champ]) => champ),
  } as ChampionDetails;
}

/**
 * Retourne la liste des objets disponible. Les informations retournées
 * dépendent de la version du jeu ainsi que de la langue
 */
export async function getItems(locale: string) {
  const lang = LANGUAGES.find((lang) => lang.locale === locale)?.locale_full ?? DEFAULT_LOCALE_FULL;
  // TODO : Recupérer version et langue des cookies
  return await fetchDdragon<{ data: Items }>(
    `/cdn/${options.version}/data/${lang}/item.json`,
    `${locale}-items`,
  ).then((res) => res?.data || {});
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

// Récupère la valeur max d'info
// fetch('http://ddragon.leagueoflegends.com/cdn/13.4.1/data/fr_FR/champion.json')
//   .then((res) => res.json() as Promise<{ data: Record<string, Champion> }>)
//   .then((res) => res.data)
//   .then((res) => Object.values(res))
//   .then((res) => res.map((champ) => Math.max(...Object.values(champ.info))))
//   .then((res) => console.log(Math.max(...res)));
