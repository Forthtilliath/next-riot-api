import Axios from "axios";
import { setupCache } from "axios-cache-interceptor";
import { DEFAULT_LANGUAGE, LANGUAGES } from "./utils/constantes";

const BASE_URL_DDRAGON = "https://ddragon.leagueoflegends.com";
const BASE_URL_STATIC = "https://static.developer.riotgames.com";

const apiRiot = setupCache(
  Axios.create({
    baseURL: BASE_URL_DDRAGON,
  })
);

const apiStatic = setupCache(
  Axios.create({
    baseURL: BASE_URL_STATIC,
  })
);

const options = {
  language: "fr_FR",
  version: "13.3.1",
};

async function fetchDdragon<T>(route: string, id: string) {
  return await apiRiot
    .get<T>(route, { id })
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      return [] as T;
    });
}

async function fetchStatic<T>(route: string, id: string) {
  return await apiStatic
    .get<T>(route, { id })
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      return [] as T;
    });
}

/** Retourne la liste des versions disponibles  */
export async function getVersions() {
  return await fetchDdragon<string[]>("/api/versions.json", "versions");
}

/** Retourne la liste des langues disponibles */
export async function getLanguages() {
  return await fetchDdragon<string[]>("/cdn/languages.json", "languages");
}

/** Retourne la liste des langues disponibles */
export async function getMaps() {
  return await fetchStatic<MapLol[]>("/docs/lol/maps.json", "maps");
}

/** Retourne la dernière version disponible */
export async function getLastVersion() {
  return await getVersions().then((res) => res[0]);
}

/**
 * Retourne la liste des champions disponible. Les informations retournées
 * dépendent de la version du jeu ainsi que de la langue
 */
export async function getChampions() {
  // TODO : Recupérer version et langue des cookies
  return await fetchDdragon<{ data: Champion[] }>(
    `/cdn/${options.version}/data/${options.language}/champion.json`,
    "champions"
  ).then((res) => res.data);
}

/**
 * Retourne la liste des objets disponible. Les informations retournées
 * dépendent de la version du jeu ainsi que de la langue
 */
export async function getItems(locale: string) {
  const lang = LANGUAGES.find(lang => lang.trans_key === locale)?.api_lang ?? DEFAULT_LANGUAGE;;
  // TODO : Recupérer version et langue des cookies
  return await fetchDdragon<{ data: Items }>(
    `/cdn/${options.version}/data/${lang}/item.json`,
    // `/cdn/${options.version}/data/${options.language}/item.json`,
    `${locale}-items`
    // "items"
  ).then((res) => res.data);
}

export function getItemUrlImage(filename: string) {
  return `${BASE_URL_DDRAGON}/cdn/${options.version}/img/item/${filename}`;
}
