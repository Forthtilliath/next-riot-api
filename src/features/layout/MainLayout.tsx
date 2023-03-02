import Head from 'next/head';

import { useTranslation } from 'next-i18next';
import React, { PropsWithChildren } from 'react';

import styles from '@/styles/Layout.module.scss';

type Props = {
  title: string;
};

export default function MainLayout({ title, children }: PropsWithChildren<Props>) {
    const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{`WiwottoF - ${title}`}</title>
        <meta name="description" content={`${t('common:layout:description')}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>{children}</main>
    </>
  );
}
