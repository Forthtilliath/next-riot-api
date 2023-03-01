import { GetServerSidePropsContext } from 'next';

import { getLanguages, getMaps, getVersions } from '@/utils/api/apiRiot';

export default async function getServerSideProps(_ctx: GetServerSidePropsContext) {
  try {
    const [versions, languages, maps] = await Promise.all([getVersions(), getLanguages(), getMaps()]);
    return { props: { versions, languages, maps } } as const;
  } catch (error) {
    return { props: { error } } as const;
  }
}