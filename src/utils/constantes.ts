export const LANGUAGES = [
  {
    locale: 'fr',
    locale_full: 'fr_FR',
    flag: '/assets/France-Flag.webp',
  },
  {
    locale: 'en',
    locale_full: 'en_US',
    flag: '/assets/United-Kingdom-flag.webp',
  },
] as const;

export const DEFAULT_LOCALE: TLocale = 'fr';
export const DEFAULT_LOCALE_FULL: TLocaleFull = 'fr_FR';