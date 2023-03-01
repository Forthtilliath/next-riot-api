import Head from 'next/head';

import { useTranslation } from 'next-i18next';
import React from 'react';

import { APP_NAME } from '@/utils/constantes';

import stylesPage from '@/styles/Page.module.scss';

type Props = {
  trans_key: string;
};

export default function Error({ trans_key }: Props) {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{`${APP_NAME} - ${t(trans_key)}`}</title>
      </Head>

      <main className={stylesPage.main}>{t(trans_key)}</main>
    </>
  );
}
