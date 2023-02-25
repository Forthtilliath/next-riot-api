import { LANGUAGES } from "@/utils/constantes";

declare global {
  type TLanguage = typeof LANGUAGES[number];
  type TLanguageKey = TLanguage["trans_key"];
  type TLanguageApi = TLanguage["api_lang"];
}
