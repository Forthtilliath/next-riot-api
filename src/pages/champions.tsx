import Head from 'next/head';

import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { getChampions } from '@/utils/api/apiRiot';
import { APP_NAME, DEFAULT_LOCALE } from '@/utils/constantes';

import styles from '@/styles/Champions.module.scss';
import stylesPage from '@/styles/Page.module.scss';

type Props = {
  champions: Awaited<ReturnType<typeof getChampions>>;
  error: TError;
};

export default function Champions({ champions, error }: Props) {
  const { t } = useTranslation();
  console.log(champions);

  return (
    <>
      <Head>
        <title>{`${APP_NAME} - ${t('champions:title')}`}</title>
      </Head>
      <main className={stylesPage.main}>
        <h1>CHAMPIONS</h1>
        {error.hasError ? (
          <h2>{t(error.key)}</h2>
        ) : (
          <ul>
            {Object.values(champions).map((champion) => (
              <li key={champion.id}>{champion.name}</li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}

export async function getServerSideProps({ locale = DEFAULT_LOCALE }: GetServerSidePropsContext) {
  const champions = await getChampions(locale);

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'champions'])),
      champions,
      error: {
        hasError: !champions || champions.length === 0,
        key: 'common:errors:fetch-champions',
      } as TError,
    },
  };
}