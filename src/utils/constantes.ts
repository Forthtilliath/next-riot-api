export const LANGUAGES = [
  {
    trans_key: "fr",
    image: "/assets/France-Flag.webp",
    api_lang: "fr_FR",
  },
  {
    trans_key: "en",
    image: "/assets/United-Kingdom-flag.webp",
    api_lang: "en_US",
  },
] as const;

export const DEFAULT_LANGUAGE: TLanguageApi = "fr_FR";
