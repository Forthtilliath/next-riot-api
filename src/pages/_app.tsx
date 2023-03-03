import type { AppProps } from 'next/app';

import { appWithTranslation } from 'next-i18next';
import nextI18nConfig from 'next-i18next.config';

import Footer from '@/features/Footer';
import Navbar from '@/features/navbar/Navbar';

import '@/styles/globals.scss';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default appWithTranslation(App, nextI18nConfig);
