import { findValueInKeys } from './object';

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

