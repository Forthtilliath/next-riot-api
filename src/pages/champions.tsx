import Head from 'next/head';

import { getChampions } from '@/apiRiot';
import { AxiosError } from 'axios';
import { useTranslation } from 'next-i18next';

import styles from '@/styles/Champions.module.scss';
import stylesPage from '@/styles/Page.module.scss';

type Props = {
  champions: Awaited<ReturnType<typeof getChampions>>;
  error: AxiosError;
};

export default function Champions({ champions, error }: Props) {
  const { t } = useTranslation();

  if (error) return <h2>{error.message}</h2>;

  return (
    <>
      <Head>
        <title>League of Forth</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={stylesPage.main}>
        <h1>CHAMPIONS</h1>
        <ul>
          {Object.values(champions).map((champion) => (
            <li key={champion.id}>{champion.name}</li>
          ))}
        </ul>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const champions = await getChampions();
  // console.log(champions)

  return { props: { champions } };
}
