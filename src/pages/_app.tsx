import Navbar from "@/features/Navbar";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { CookiesProvider } from "react-cookie";
import { appWithTranslation } from "next-i18next";

function App({ Component, pageProps }: AppProps) {
  return (
    <CookiesProvider>
      <Navbar />
      <Component {...pageProps} />
    </CookiesProvider>
  );
}

export default appWithTranslation(App);
