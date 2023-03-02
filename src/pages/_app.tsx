import type { AppProps } from 'next/app';

import { appWithTranslation } from 'next-i18next';
import nextI18nConfig from 'next-i18next.config';
import { CookiesProvider } from 'react-cookie';

import Footer from '@/features/Footer';
import Navbar from '@/features/navbar/Navbar';

import '@/styles/globals.scss';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

function App({ Component, pageProps }: AppProps) {
  return (
    <CookiesProvider>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </CookiesProvider>
  );
}

export default appWithTranslation(App, nextI18nConfig);

export async function getServerSideProps({ locale = 'fr' }: GetServerSidePropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'champions'])),
    },
  };
}
