import { CSSProperties } from 'react';

/**
 *  `W`hen `i`t's `Wo`rth, `T`hanks `to` `F`orth
 */
export const APP_NAME = 'Wiwottof';

export const ASSETS = '/assets/';

/**
 * Images (champion/item/map) servies directement depuis le CDN public de
 * Riot (Data Dragon) plutôt que vendorées en local — toujours à jour avec
 * la version du jeu passée en paramètre, sans avoir à retélécharger quoi
 * que ce soit à chaque patch.
 */
const DDRAGON_CDN = 'https://ddragon.leagueoflegends.com/cdn';

export const PATH = {
  FLAG: ASSETS + 'flags/',
} as const;

export function championSquareUrl(version: string, id: string) {
  return `${DDRAGON_CDN}/${version}/img/champion/${id}.png`;
}

export function itemImgUrl(version: string, id: string) {
  return `${DDRAGON_CDN}/${version}/img/item/${id}.png`;
}

export function mapImgUrl(version: string, mapId: string) {
  return `${DDRAGON_CDN}/${version}/img/map/map${mapId}.png`;
}

export const LANGUAGES = [
  {
    locale: 'fr',
    locale_full: 'fr_FR',
    flag: PATH.FLAG + 'France-Flag.webp',
  },
  {
    locale: 'en',
    locale_full: 'en_US',
    flag: PATH.FLAG + 'United-Kingdom-flag.webp',
  },
] as const;

export const DEFAULT_LOCALE: TLocale = 'fr';
export const DEFAULT_LOCALE_FULL: TLocaleFull = 'fr_FR';
export const LOCALES = LANGUAGES.map((lang) => lang.locale);

export const MAPS = {
  SUMMONER_RIFT: '11',
  HOWLING_ABYSS: '12',
} as const;

export function mapCssUrl(version: string): Record<keyof typeof MAPS, CSSProperties> {
  return {
    SUMMONER_RIFT: { '--url': `url('${mapImgUrl(version, MAPS.SUMMONER_RIFT)}')` } as CSSProperties,
    HOWLING_ABYSS: { '--url': `url('${mapImgUrl(version, MAPS.HOWLING_ABYSS)}')` } as CSSProperties,
  };
}

export const CHAMPION_TAGS = [
  'Fighter',
  'Tank',
  'Mage',
  'Assassin',
  'Marksman',
  'Support',
] as const;
