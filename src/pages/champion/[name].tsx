import Image from 'next/image';
import { useRouter } from 'next/router';

import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import InfoBar from '@/features/champions/InfoBar';
import Error from '@/features/Error';
import MainLayout from '@/features/layout/MainLayout';

import { getChampion } from '@/utils/api/apiRiot';
import { DEFAULT_LOCALE, PATH } from '@/utils/constantes';

import styles from '@/styles/Champions.module.scss';

type Props = Awaited<ReturnType<typeof getServerSideProps>>['props'];

export default function Champion({ champion, error }: Props) {
  const router = useRouter();
  const { t } = useTranslation();

  // TODO Utilisation des keys !
  if (error.hasError) {
    return <Error trans_key={error.key} />;
    // return <Error trans_key={'common:errors:champion-not-found'} />;
  }

  const { name, tags, title, blurb, info } = champion as Champion;
  const queryName = router.query.name as string;

  console.log(champion);

  return (
    <MainLayout title={name}>
      <div className={styles.coverWrapper}>
        <Image
          src={PATH.COVER + queryName + '_0.jpg'}
          alt="cover"
          className={styles.cover}
          // width={1200}
          // height={300}
          // sizes="(max-width: 1200px) 100dvw, 1200px"
          // style={{ maxWidth: 1200, width: '100dvw', height:'auto' }}
          // style={{ maxWidth: 1200, width: '100dvw', maxHeight:300 }}
          priority
          fill
        />
      </div>
      <h1>{name}</h1>
      <div className={styles.row}>
        <div className={styles.slider}>Slider</div>
        <div className={styles.details}>
          <h2 className={styles.h2}>{title}</h2>
          <div className={styles.tagsWrapper}>
            {tags.map((tag) => (
              <span key={tag} className={styles.tag} active="true">
                {tag}
              </span>
            ))}
          </div>
          <p className={styles.blurb}>{blurb}</p>
          <div className={styles.infos}>
            {Object.entries(info).map(([key, value]) => (
              <InfoBar key={key} label={key} value={value} type={key as UnionInfos} />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.moreChamptions}>
        {/* Récupérer des champions avec les mêmes tags */}
      </div>
    </MainLayout>
  );
}

// export async function getServerSideProps({ locale = 'fr' }: GetServerSidePropsContext) {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ['common', 'champions'])),
//     },
//   };
// }

export async function getServerSideProps({
  locale = DEFAULT_LOCALE,
  params,
}: GetServerSidePropsContext) {
  const champion = (await getChampion(locale, params?.name as string)) as Champion | null;

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'champions'])),
      champion,
      error: {
        hasError: !champion,
        key: 'common:errors:fetch-champion',
      } as TError,
    },
  };
}
