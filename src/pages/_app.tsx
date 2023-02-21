import Navbar from "@/features/Navbar";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { CookiesProvider } from "react-cookie";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CookiesProvider>
      <Navbar />
      <Component {...pageProps} />
    </CookiesProvider>
  );
}
