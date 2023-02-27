import { keysToKeep } from '@/pages/items';
import { ItemFiltered } from '@/pages/items';

declare global {
  type UnionFilterItems = (typeof keysToKeep)[number];
//   type ItemFiltered = typeof itemsFiltered[number][1];
  type ItemFiltered = Pick<Item, UnionFilterItems>;

  type TGroups = 'starter' | 'basic' | 'epic' | 'legendary' | 'mythic';
  //   type TGroups = 'basic' | 'epic' | 'legendary' | 'mythic';
  type TSortedItems = Record<TGroups, [string, ItemFiltered][]>;
}

export {};
