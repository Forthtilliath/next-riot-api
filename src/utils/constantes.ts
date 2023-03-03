import { CSSProperties } from 'react';

/**
 *  `W`hen `i`t's `Wo`rth, `T`hanks `to` `F`orth
 */
export const APP_NAME = 'Wiwottof';

export const ASSETS = '/assets/';
export const VERSION = '13.4.1';

export const PATH = {
  FLAG: ASSETS + 'flags/',
  ITEM: ASSETS + VERSION + '/img/item/',
  MAP: ASSETS + VERSION + '/img/map/',
  CHAMPION: ASSETS + VERSION + '/img/champion/',
  COVER: ASSETS + 'champion/centered/',
  LOADING: ASSETS + 'champion/loading/'
} as const;

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

export const CSS_URL = {
  SUMMONER_RIFT: { '--url': `url('${PATH.MAP}map11.png')` } as CSSProperties,
  HOWLING_ABYSS: { '--url': `url('${PATH.MAP}map12.png')` } as CSSProperties,
};

// export const CHAMPION_TAGS = [
//   'fighter',
//   'tank',
//   'mage',
//   'assassin',
//   'marksman',
//   'support',
// ] as const;
export const CHAMPION_TAGS = [
  'Fighter',
  'Tank',
  'Mage',
  'Assassin',
  'Marksman',
  'Support',
] as const;
