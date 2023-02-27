import { isObject } from './object';

export function filterArrayOfObjects<T>(item: T, propsToCompare: Array<keyof T>, value: string) {
  return customFilter(item, propsToCompare, value);
}

/**
 * It takes an array of entries, and returns a filtered array of entries
 * @param  - [id: string, item: T] - this is the array of entries that we're filtering.
 * @param propsToCompare - Array of keys of the object to compare
 * @param {string} value - string - the value to compare against
 * @returns A function that takes an array of entries and returns a boolean.
 */
export function filterArrayOfEntries<T>(
  [, item]: [id: string, item: T],
  propsToCompare: Array<keyof T>,
  value: string,
) {
  return customFilter(item, propsToCompare, value);
}

/**
 * It takes an object, an array of keys to compare, and a value to compare against. It returns true if
 * any of the keys in the object match the value
 * @param {T} item - T - the item to compare
 * @param propsToCompare - An array of keys to compare against.
 * @param {string} value - the value to search for
 * @returns A function that takes in an item, an array of keys, and a value.
 */
export function customFilter<T>(item: T, propsToCompare: Array<keyof T>, value: string) {
  return propsToCompare.some((prop) => {
    if (!isObject(item)) return false;
    if (!item.hasOwnProperty(prop)) return false;

    const key = item[prop] as string;

    return key.toLowerCase().includes(value.toLowerCase());
  });
}
