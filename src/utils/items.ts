import { filterKeys } from './methods/object';

export const keysToKeep = [
  'version',
  'name',
  'gold',
  'image',
  'colloq',
  'maps',
  'depth',
  'tags',
  'into',
] as const;

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
