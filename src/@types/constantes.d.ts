import { LANGUAGES } from '@/utils/constantes';

declare global {
  type TLanguage = (typeof LANGUAGES)[number];
  type TLocale = TLanguage['locale'];
  type TLocaleFull = TLanguage['locale_full'];
}
