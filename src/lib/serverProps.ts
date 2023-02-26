import { getLanguages, getMaps, getVersions } from "@/apiRiot";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default async function getServerSideProps(
  _ctx: GetServerSidePropsContext
) {
  try {
    const [versions, languages, maps] = await Promise.all([
      getVersions(),
      getLanguages(),
      getMaps(),
    ]);
    return { props: { versions, languages, maps } } as const;
  } catch (error) {
    return { props: { error } } as const;
  }
}

type TranslationProps = {
  locale: GetServerSidePropsContext["locale"];
  ns: string[];
};
export async function getSSP_Translation({
  locale = "fr",
  ns = [],
}: TranslationProps) {
  return {
    ...(await serverSideTranslations(locale, ns)),
  };
}
