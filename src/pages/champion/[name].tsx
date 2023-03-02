import Image from 'next/image';
import { useRouter } from 'next/router';

import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import MainLayout from '@/features/layout/MainLayout';

import { DEFAULT_LOCALE, PATH } from '@/utils/constantes';

import styles from '@/styles/Champions.module.scss';
import { getChampion } from '@/utils/api/apiRiot';

type Props = Awaited<ReturnType<typeof getServerSideProps>>['props'];

export default function Champion({ champion, error }: Props) {
  const router = useRouter();
  const { t } = useTranslation();

  // const { name } = champion;
  const name = router.query.name as string;
  // 1280x720 =>
  console.log(champion)

  return (
    <MainLayout title={name}>
      <div className={styles.coverWrapper}>
        <Image
          src={PATH.COVER + name + '_0.jpg'}
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
        <div className={styles.slider}>

        </div>
        <div className={styles.details}>
          <div className={styles.tagsWrapper}>

          </div>
        </div>
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
