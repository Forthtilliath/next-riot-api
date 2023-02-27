import Head from 'next/head';

import { getItems } from '@/apiRiot';
import { getSSR_Translation } from '@/lib/serverProps';
import { AxiosError } from 'axios';
import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Item from '@/features/items/Item';
import Searchbar from '@/features/Searchbar';

import { useSearchTerm } from '@/utils/hooks';

import styles from '@/styles/Items.module.scss';
import stylesPage from '@/styles/Page.module.scss';

type Props = {
  items: ReturnType<typeof filterItems>;
  error: AxiosError;
};

export default function Items({ items, error }: Props) {
  const { t } = useTranslation('items');
  // console.log(items);

  const [search, onChange, itemsFiltered, reset] = useSearchTerm(items, ['name', 'colloq']);

  // Garde seulement les objets achetables
  // TODO: Ajouter des filtres sur les maps
  const purchasableItems = Object.values(itemsFiltered).filter(([, item]) => item.gold.purchasable);

  return (
    <>
      <Head>
        <title>{`League of Forth - ${t('title')}`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={stylesPage.main}>
        <h1 className={stylesPage.title}>{t('title')}</h1>
        <Searchbar searchTerm={search} onChange={onChange} reset={reset} />
        <div className={styles.container}>
          {error && <h2>{error.message}</h2>}
          {purchasableItems.map(([key, item]) => (
            <Item key={key} {...item} />
          ))}
        </div>
      </main>
    </>
  );
}

const filterKeys = ['name', 'gold', 'image', 'colloq'] as const;

// TODO Locale = langue dispo
// export async function getServerSideProps({
//   locale = "fr",
// }: GetServerSidePropsContext) {
//   const items = await getItems(locale);

//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ["common", "items"])),
//       items: filterItems(items),
//     },
//   };
// }
export async function getServerSideProps({ locale = 'fr' }: GetServerSidePropsContext) {
  const items = await getItems(locale);

  return {
    props: {
      ...(await getSSR_Translation({ locale, ns: ['common', 'items'] })),
      items: filterItems(items),
    },
  };
}

export type UnionFilterItems = (typeof filterKeys)[number];
export type ItemFiltered = Pick<Item, UnionFilterItems>;

export function filterItems(items: Items) {
  const aItemsFiltered = Object.values(items).map((item) => {
    return Object.fromEntries(filterKeys.map((k) => [k, item[k]])) as ItemFiltered;
  });

  return aItemsFiltered;
}
