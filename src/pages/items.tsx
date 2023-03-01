import Head from 'next/head';

import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';

import GroupItems from '@/features/items/GroupItems';
import SwitchMap from '@/features/items/SwitchMap';
import Searchbar from '@/features/items/Searchbar';

import { getItems } from '@/utils/api/apiRiot';
import { APP_NAME, DEFAULT_LOCALE, MAPS } from '@/utils/constantes';
import { useSearchTerm } from '@/utils/hooks';
import { filterKeys } from '@/utils/methods/object';

import styles from '@/styles/Items.module.scss';
import stylesPage from '@/styles/Page.module.scss';

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

  const sortedItems = purchasableItems.reduce(
    (acc, [key, item]) => {
      switch (item.depth) {
        // MYTHIC / LEGENDARY
        case 3: {
          if (item.into) {
            acc.mythic.push([key, item]);
          } else {
            acc.legendary.push([key, item]);
          }
          break;
        }
        // LEGENDARY / EPIC
        case 2: {
          // La rabadon et l'id ont un depth de 2 alors qu'il devrait être de 3
          // Pour fixer cela, je tri aussi sur l'into pour les depth 2
          if (item.into) {
            acc.epic.push([key, item]);
          } else {
            acc.legendary.push([key, item]);
          }
          break;
        }
        // STARTER / BASIC
        default: {
          if (item.tags && (item.tags.includes('Lane') || item.tags.includes('Jungle'))) {
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
    } as TSortedItems,
  );

  return (
    <>
      <Head>
        <title>{`${APP_NAME} - ${t('items:title')}`}</title>
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

            <div className={styles.container}>
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



export async function getServerSideProps({ locale = DEFAULT_LOCALE }: GetServerSidePropsContext) {
  const items = await getItems(locale);

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'items'])),
      items: filterKeysOfItems(items),
      error: {
        hasError: !items || Object.keys(items).length === 0,
        key: 'common:errors:fetch-items',
      } as TError,
    },
  };
}

/**
 * Filtre les clés des objets afin de ne conserver que celles que l'on a besoin.
 * @param {Items} items - Objets ausquel on veut filtrer les clés
 * @returns Les objets avec uniquement les clés souhaitées
 */
export function filterKeysOfItems(items: Items) {
  const aItemsFiltered = Object.entries(items).map(([id, item]) => {
    return [id, filterKeys(item, keysToKeep)] as const;
  });

  return Object.fromEntries(aItemsFiltered);
}
