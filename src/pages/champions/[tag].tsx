import { useRouter } from 'next/router';

import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useState } from 'react';

import LinkToChampion from '@/features/champions/LinkToChampion';
import SwitchTags from '@/features/champions/SwitchTags';
import MainLayout from '@/features/layout/MainLayout';

import { getChampions } from '@/utils/api/apiRiot';
import { CHAMPION_TAGS, DEFAULT_LOCALE } from '@/utils/constantes';
import { filterKeysOfArrayObjects } from '@/utils/methods/array';
import { capitalize } from '@/utils/methods/string';

import styles from '@/styles/Champions.module.scss';

type Props = Awaited<ReturnType<typeof getServerSideProps>>['props'];

export default function Champions({ champions, error }: Props) {
  const [tag, _setTag] = useState<UnionTags | 'All'>('All');
  const { t } = useTranslation();
  const router = useRouter();

  // Réécriture du setter pour mettre à jour le pathname avec le tag
  const setTag: typeof _setTag = (tag) => {
    _setTag(tag);

    const sTag = (tag as string).toLowerCase();
    router.push({ pathname: router.pathname, query: { tag: sTag } }, undefined, {
      shallow: true,
    });
  };

  // Au chargement, on adapte le tag par rapport à la valeur de la query
  useEffect(() => {
    if (typeof router.query?.tag === 'string') {
      const queryTag = capitalize(router.query.tag);
      if (isChampionTag(queryTag)) {
        setTag(queryTag);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.tag]);

  const championsFiltered = champions.filter((champ) => champ.tags.includes(tag) || tag === 'All');

  return (
    <MainLayout title={t('champions:title')}>
      <h1>{t('champions:title')}</h1>
      {error.hasError ? (
        <h2>{t(error.key)}</h2>
      ) : (
        <>
          <SwitchTags setTag={setTag} tag={tag} />

          <div className={styles.championsWrapper}>
            {championsFiltered.map(({ key, id, name }) => (
              <LinkToChampion key={key} id={id} name={name} />
            ))}
          </div>
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

function isChampionTag(tag: any): tag is UnionTags {
  return CHAMPION_TAGS.includes(tag);
}
