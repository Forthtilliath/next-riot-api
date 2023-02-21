import { getLanguages, getMaps, getVersions } from "@/apiRiot";
import { GetServerSidePropsContext } from "next";

export default async function getServerSideProps(
  _ctx: GetServerSidePropsContext
) {
  try {
    const [versions, languages, maps] = await Promise.all([
      getVersions(),
      getLanguages(),
      getMaps()
    ]);
    return { props: { versions, languages, maps } } as const;
  } catch (error) {
    return { props: { error } } as const;
  }
}
