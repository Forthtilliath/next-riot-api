import Head from 'next/head';

import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';

import GroupItems from '@/features/items/GroupItems';
import Item from '@/features/items/Item';
import SwitchMap from '@/features/items/SwitchMap';
import Searchbar from '@/features/Searchbar';

import { getItems } from '@/utils/api/apiRiot';
import { DEFAULT_LOCALE, MAPS } from '@/utils/constantes';
import { useSearchTerm } from '@/utils/hooks';

import styles from '@/styles/Items.module.scss';
import stylesPage from '@/styles/Page.module.scss';
import { filterKeys } from '@/utils/methods/object';

type Props = {
  items: ReturnType<typeof filterKeysOfItems>;
  error: TError;
};

export default function Items({ items, error }: Props) {
  const [map, setMap] = useState<ObjectValues<typeof MAPS>>(MAPS.SUMMONER_RIFT);
  const { t } = useTranslation('');

  const [search, onChange, itemsFiltered, reset] = useSearchTerm(items, ['name', 'colloq']);

  // Garde seulement les objets achetables
  const purchasableItems = Object.values(itemsFiltered).filter(
    ([, item]) => item.gold.purchasable && item.gold.base > 0 && item.maps[map],
  );
  type a = typeof itemsFiltered[number][1]

  const sortedItems = purchasableItems.reduce(
    (acc, [key, item]) => {
      switch (item.depth) {
        // depth = 3 avec into => mythic
        // Sinon => legendary
        case 3: {
          if (item.into) {
            acc.mythic.push([key, item]);
          } else {
            acc.legendary.push([key, item]);
          }
          break;
        }
        // depth = 2 => epic
        case 2: {
          acc.epic.push([key, item]);
          break;
        }
        // Si tags inclus : lane / jungle => starter
        // Sinon => basic
        default: {
          if ((item.tags && item.tags.includes('Lane')) || item.tags.includes('Jungle')) {
            acc.starter.push([key, item]);
          } else {
            acc.basic.push([key, item]);
          }
        }
      }
      return acc;
    },
    {
      starter: [],
      basic: [],
      epic: [],
      legendary: [],
      mythic: [],
      // } as Record<'basic' | 'epic' | 'legendary' | 'mythic', [string, ItemFiltered][]>,
    } as TSortedItems,
  );
  // console.log(sortedItems);

  return (
    <>
      <Head>
        <title>{`League of Forth - ${t('items:title')}`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={stylesPage.main}>
        <h1 className={stylesPage.title}>{t('items:title')}</h1>
        {error.hasError ? (
          <h2>{t(error.key)}</h2>
        ) : (
          <>
            <div className={styles.filters}>
              <SwitchMap setMap={setMap} />
              <Searchbar searchTerm={search} onChange={onChange} reset={reset} />
            </div>
            {/* <div className={styles.container}>
              {purchasableItems.map(([key, item]) => (
                <Item key={key} {...item} />
              ))}
            </div> */}
            <div className={styles.container}>
              {/* <GroupItems name="Starter & Basic" items={sortedItems.basic} /> */}
              <GroupItems name="Starter" items={sortedItems.starter} />
              <GroupItems name="Basic" items={sortedItems.basic} />
              <GroupItems name="Epic" items={sortedItems.epic} />
              <GroupItems name="Legendary" items={sortedItems.legendary} />
              <GroupItems name="Mythic" items={sortedItems.mythic} />
            </div>
          </>
        )}
      </main>
    </>
  );
}

export const keysToKeep = [
  'name',
  'gold',
  'image',
  'colloq',
  'maps',
  'depth',
  'tags',
  'into',
] as const;

// TODO Locale = langue dispo
export async function getServerSideProps({ locale = DEFAULT_LOCALE }: GetServerSidePropsContext) {
  const items = await getItems(locale);

  // Initialise les props avec les traductions et un array vide typé en cas d'erreur
  const props = {
    ...(await serverSideTranslations(locale, ['common', 'items'])),
    items: [] as ItemFiltered[],
    error: { hasError: false } as TError,
  };

  if (items === undefined) {
    // Erreur lors de la récupération des objets
    Object.assign(props, {
      error: { hasError: true, key: 'common:errors:fetch-items' },
    });
  } else {
    // Objets récupérés
    Object.assign(props, {
      items: filterKeysOfItems(items),
      // items,
    });
  }

  return { props };
}


/**
 * Filtre les clés des objets afin de ne conserver que celles que l'on a besoin.
 * @param {Items} items - Objets ausquel on veut filtrer les clés
 * @returns Les objets avec uniquement les clés souhaitées
 */
export function filterKeysOfItems(items: Items) {
  const aItemsFiltered = Object.entries(items).map(([id, item]) => {
    // return Object.fromEntries(filterKeys.map((k) => [k, item[k]])) as ItemFiltered;
    // filter => car quelques clés sont optionnelles
    return [
      id,
      filterKeys(item, keysToKeep)
    ] as const;
    // return [
    //   id,
    //   Object.fromEntries(
    //     keysToKeep.filter((k) => item[k]).map((k) => [k, item[k]]),
    //   ) as ItemFiltered,
    // ] as const;
  });

  return Object.fromEntries(aItemsFiltered);
}
