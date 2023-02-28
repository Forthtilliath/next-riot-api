import { keysToKeep } from '@/pages/items';
import { ItemFiltered } from '@/pages/items';

declare global {
  type Items = Record<string, Item>;
  type Item = {
    name: string;
    description: string;
    colloq: string;
    plaintext: string;
    from: string[];
    into: string[];
    image: {
      full: string;
      sprite: string;
      group: string;
      x: number;
      y: number;
      w: number;
      h: number;
    };
    gold: {
      base: number;
      purchasable: boolean;
      total: number;
      sell: number;
    };
    tags: string[];
    maps: {
      '11': boolean;
      '12': boolean;
      '21': boolean;
      '22': boolean;
    };
    stats: Record<string, number>;
    depth: number;
  };

  type ItemWithId = Item & { id: string };

  type ItemsDetails = Record<string, ItemDetails>;
  /** Objet affiché avec from et into details */
  type ItemDetails = Omit<ItemWithId, 'from' | 'into'> & {
    from: ItemWithId[];
    into: ItemWithId[];
  };

  type UnionFilterItems = (typeof keysToKeep)[number];
  //   type ItemFiltered = typeof itemsFiltered[number][1];
  type ItemFiltered = Pick<Item, UnionFilterItems>;

  type TGroups = 'starter' | 'basic' | 'epic' | 'legendary' | 'mythic';
  //   type TGroups = 'basic' | 'epic' | 'legendary' | 'mythic';
  type TSortedItems = Record<TGroups, [string, ItemFiltered][]>;
}

export {};
