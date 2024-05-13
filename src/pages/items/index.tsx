import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';

import GroupItems from '@/features/items/GroupItems';
import Searchbar from '@/features/items/Searchbar';
import SwitchMap from '@/features/items/SwitchMap';
import MainLayout from '@/features/layout/MainLayout';

import { getItems } from '@/utils/api/apiRiot';
import { DEFAULT_LOCALE, MAPS } from '@/utils/constantes';
import { useSearchTerm } from '@/utils/hooks';
import { filterKeys } from '@/utils/methods/object';

import styles from '@/styles/Items.module.scss';

type Props = Awaited<ReturnType<typeof getServerSideProps>>['props'];

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
    <MainLayout title={t('items:title')}>
      <h1>{t('items:title')}</h1>
      {error.hasError ? (
        <h2>{t(error.key)}</h2>
      ) : (
        <>
          <div className={styles.filters}>
            <SwitchMap setMap={setMap} />
            <Searchbar searchTerm={search} onChange={onChange} reset={reset} />
          </div>

          <div className={styles.container}>
            <GroupItems name={t('items:headers:starter')} items={sortedItems.starter} />
            <GroupItems name={t('items:headers:basic')} items={sortedItems.basic} />
            <GroupItems name={t('items:headers:epic')} items={sortedItems.epic} />
            <GroupItems name={t('items:headers:legendary')} items={sortedItems.legendary} />
            <GroupItems name={t('items:headers:mythic')} items={sortedItems.mythic} />
          </div>
        </>
      )}
    </MainLayout>
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
