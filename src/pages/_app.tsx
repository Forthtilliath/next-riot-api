import { CookiesProvider } from 'react-cookie';

import type { AppProps } from 'next/app';

import { appWithTranslation } from 'next-i18next';
import nextI18nConfig from 'next-i18next.config';

import Navbar from '@/features/Navbar';

import '@/styles/globals.scss';

function App({ Component, pageProps }: AppProps) {
  return (
    <CookiesProvider>
      <Navbar />
      <Component {...pageProps} />
    </CookiesProvider>
  );
}

export default appWithTranslation(App, nextI18nConfig);
