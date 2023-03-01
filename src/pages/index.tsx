import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import MainLayout from '@/features/layout/mainLayout';

// import styles from "@/styles/Home.module.scss";

export default function Home() {
  const { t } = useTranslation('home');
  return (
    <MainLayout title={t('title')}>
      <h1>{t('title')}</h1>
    </MainLayout>
  );
}

export async function getServerSideProps({ locale = 'fr' }: GetServerSidePropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'home'])),
    },
  };
}
