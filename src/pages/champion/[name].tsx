import Image from 'next/image';
import { useRouter } from 'next/router';

import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import MainLayout from '@/features/layout/MainLayout';

import { PATH } from '@/utils/constantes';

import styles from '@/styles/Champions.module.scss';

// type Props = Awaited<ReturnType<typeof getServerSideProps>>['props'];
type Props = any;

export default function Champion({ champion, error }: Props) {
  const router = useRouter();
  const { t } = useTranslation();

  // const { name } = champion;
  const name = router.query.name as string;
  // 1280x720 =>

  return (
    <MainLayout title={name}>
      <div className={styles.coverWrapper}>
        <Image
          src={PATH.COVER + name + '_0.jpg'}
          alt="cover"
          className={styles.cover}
          width={1200}
          height={300}
          priority
          sizes="(max-width: 1200px) 100dvw, 1200px"
        />
      </div>
      <h1>{name}</h1>
    </MainLayout>
  );
}

export async function getServerSideProps({ locale = 'fr' }: GetServerSidePropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'champions'])),
    },
  };
}

// export async function getServerSideProps({
//   locale = DEFAULT_LOCALE,
//   params,
// }: GetServerSidePropsContext) {
//   const item = (await getItem(locale, params?.id as string)) as ItemDetails | null;

//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ['common', 'items'])),
//       item,
//       error: {
//         hasError: !item,
//         key: 'common:errors:fetch-item',
//       } as TError,
//     },
//   };
// }
