import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { getLanguages, getMaps, getVersions } from '@/utils/api/apiRiot';
import { DEFAULT_LOCALE } from '@/utils/constantes';

export default async function getServerSideProps(_ctx: GetServerSidePropsContext) {
  try {
    const [versions, languages, maps] = await Promise.all([getVersions(), getLanguages(), getMaps()]);
    return { props: { versions, languages, maps } } as const;
  } catch (error) {
    return { props: { error } } as const;
  }
}

type TranslationProps = {
  locale: GetServerSidePropsContext['locale'];
  ns: string[];
};
/**
 * It takes a locale and an array of namespaces, and returns an object with the translations for the
 * given locale and namespaces
 * @param locale the locale to use for the translations
 * @param ns the locale to use for the translations
 * @returns An object with the keys being the namespaces and the values being the translations.
 */
export async function getSSR_Translation({ locale = DEFAULT_LOCALE, ns = [] }: TranslationProps) {
  return {
    ...(await serverSideTranslations(locale, ns)),
  };
}
