import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';

import LinkToChampion from '@/features/champions/LinkToChampion';
import SwitchTags from '@/features/champions/SwitchTags';
import MainLayout from '@/features/layout/MainLayout';

import { getChampions } from '@/utils/api/apiRiot';
import { DEFAULT_LOCALE } from '@/utils/constantes';
import { filterKeysOfArrayObjects } from '@/utils/methods/array';

import styles from '@/styles/Champions.module.scss';

type Props = Awaited<ReturnType<typeof getServerSideProps>>['props'];

export default function Champions({ champions, error }: Props) {
  const [tag, setTag] = useState<UnionTags | 'All'>('All');
  const { t } = useTranslation();

  const championsFiltered = champions.filter((champ) => champ.tags.includes(tag) || tag === 'All');

  return (
    <MainLayout title={t('champions:title')}>
      <h1>{t('champions:title')}</h1>
      {error.hasError ? (
        <h2>{t(error.key)}</h2>
      ) : (
        <>
          <SwitchTags setTag={setTag} />

          <div className={styles.championsWrapper}>
            {championsFiltered.map(({ key, id, name }) => (
              <LinkToChampion key={key} id={id} name={name} />
            ))}
          </div>
          {/* <ul>
            {Object.values(champions).map((champion) => (
              <li key={champion.id}>{champion.name}</li>
            ))}
          </ul> */}
          {/* Tags radiogroup */}
        </>
      )}
    </MainLayout>
  );
}

export const keysToKeep = ['key', 'id', 'name', 'tags'] as const;

export async function getServerSideProps({ locale = DEFAULT_LOCALE }: GetServerSidePropsContext) {
  const champions = Object.values(await getChampions(locale));

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'champions'])),
      champions: filterKeysOfArrayObjects(champions, keysToKeep),
      error: {
        hasError: !champions || champions.length === 0,
        key: 'common:errors:fetch-champions',
      } as TError,
    },
  };
}

// function getTags(champions: Champion[]) {
//   return Array.from(
//     new Set(champions.reduce<string[]>((tags, champ) => tags.concat(champ.tags), [])),
//   );
// }
