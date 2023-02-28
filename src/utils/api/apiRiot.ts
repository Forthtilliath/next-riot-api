import Axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';

import { DEFAULT_LOCALE_FULL, LANGUAGES } from '../constantes';

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
export async function getChampions() {
  // TODO : Recupérer version et langue des cookies
  return await fetchDdragon<{ data: Champion[] }>(
    `/cdn/${options.version}/data/${options.language}/champion.json`,
    'champions',
    // ).then((res) => res.data);
  ).then((res) => res?.data || []);
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
    // `/cdn/${options.version}/data/${options.language}/item.json`,
    `${locale}-items`,
    // "items"
    // ).then((res) => res.data);
  ).then((res) => res?.data);
  // ).then((res) => res?.data || []);
}

/**
 * Retourne la liste des objets disponible. Les informations retournées
 * dépendent de la version du jeu ainsi que de la langue
 */
export async function getItem(
  locale: string,
  id: string,
  parent = true,
): Promise<ItemWithId | ItemDetails | null> {
  const items = await getItems(locale);

  // Si pas d'objets ou objet non trouvé
  if (!items || !items?.[id]) return null;

  // TODO: Récupérer les objets from et into
  const item = items[id];

  // On évite de récupérer les from de from de from. On veut juste ceux de l'item affiché
  if (!parent) return {id, ...item};

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

async function filter<T>(arr: Array<T>, callback: Function) {
  const fail = Symbol();
  return (
    await Promise.all(arr.map(async (item) => ((await callback(item)) ? item : fail)))
  ).filter((i) => i !== fail);
}
