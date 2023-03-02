import { filterKeys, findValueInKeys } from './object';

export function filterObject<T>(item: T, propsToCompare: Array<keyof T>, value: string) {
  return findValueInKeys(item, propsToCompare, value);
}

/**
 * It takes an array of entries, and returns a filtered array of entries
 * @param  - [id: string, item: T] - this is the array of entries that we're filtering.
 * @param propsToCompare - Array of keys of the object to compare
 * @param {string} value - string - the value to compare against
 * @returns A function that takes an array of entries and returns a boolean.
 */
export function filterEntry<T>(
  [, item]: [id: string, item: T],
  propsToCompare: Array<keyof T>,
  value: string,
) {
  return findValueInKeys(item, propsToCompare, value);
}

/**
 * Filtre les clés des objets afin de ne conserver que celles que l'on a besoin.
 * @param data - Objets ausquel on veut filtrer les clés
 * @returns Les objets avec uniquement les clés souhaitées
 */
// export function filterKeysOfArrayObjects<T extends Array<Record<string, unknown>>, U>(
//   data: T,
//   keys: ReadonlyArray<string>,
// ) {
//   return data.map((value) => filterKeys(value, keys));
// }
export function filterKeysOfArrayObjects<T extends Array<Record<string, unknown>>, U extends ReadonlyArray<keyof T[number]>>(
  data: T,
  keys: U,
) {
  return data.map((value) => filterKeys<T[number], U>(value, keys));
}
