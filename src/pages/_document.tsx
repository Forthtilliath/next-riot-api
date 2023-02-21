// import { getLanguages, getVersions } from "@/apiRiot";
// import { AxiosError } from "axios";
import getServerSideProps from "@/lib/serverProps";
import { Html, Head, Main, NextScript } from "next/document";

// type Props = {
//   versions: Awaited<ReturnType<typeof getVersions>>;
//   languages: Awaited<ReturnType<typeof getLanguages>>;
//   error: AxiosError;
// };

type A = ReturnType<typeof getServerSideProps>;

export default function Document() {
  // export default function Document({ versions, languages }: Props) {
  // console.log({ versions, languages });
  return (
    <Html lang="fr">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Goldman:wght@400;700&family=Poppins:wght@200;300;400;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

// export async function getServerSideProps() {
//   try {
//     const [versions, languages] = await Promise.all([
//       getVersions(),
//       getLanguages(),
//     ]);
//     return { props: { versions, languages } };
//   } catch (error) {
//     return { props: { error } };
//   }
// }
