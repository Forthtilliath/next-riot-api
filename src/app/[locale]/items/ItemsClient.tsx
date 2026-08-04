'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import GroupItems from '@/features/items/GroupItems';
import Searchbar from '@/features/items/Searchbar';
import SwitchMap from '@/features/items/SwitchMap';
import MainLayout from '@/features/layout/MainLayout';

import { filterKeysOfItems } from '@/utils/items';
import { MAPS } from '@/utils/constantes';
import { useSearchTerm } from '@/utils/hooks';

import styles from '@/styles/Items.module.scss';

type Props = {
  items: ReturnType<typeof filterKeysOfItems>;
  version: string;
  hasError: boolean;
};

export default function ItemsClient({ items, version, hasError }: Props) {
  const [map, setMap] = useState<ObjectValues<typeof MAPS>>(MAPS.SUMMONER_RIFT);
  const t = useTranslations('items');
  const tCommon = useTranslations('common');

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
    <MainLayout>
      <h1>{t('title')}</h1>
      {hasError ? (
        <h2>{tCommon('errors.fetch-items')}</h2>
      ) : (
        <>
          <div className={styles.filters}>
            <SwitchMap setMap={setMap} version={version} />
            <Searchbar searchTerm={search} onChange={onChange} reset={reset} />
          </div>

          <div className={styles.container}>
            <GroupItems name={t('headers.starter')} items={sortedItems.starter} />
            <GroupItems name={t('headers.basic')} items={sortedItems.basic} />
            <GroupItems name={t('headers.epic')} items={sortedItems.epic} />
            <GroupItems name={t('headers.legendary')} items={sortedItems.legendary} />
            <GroupItems name={t('headers.mythic')} items={sortedItems.mythic} />
          </div>
        </>
      )}
    </MainLayout>
  );
}
