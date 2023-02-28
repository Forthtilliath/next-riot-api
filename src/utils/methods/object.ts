/**
 * If the input is an object, return true, otherwise return false.
 * @param {unknown} input - unknown
 * @returns A function that takes an unknown input and returns a boolean.
 */
export function isObject(input: unknown): input is Record<string, unknown> {
  return typeof input === 'object' && input !== null && !Array.isArray(input);
}

/**
 * It takes an object and an array of keys, and returns a new object with only the keys that are in the
 * array
 * @param {T} obj - T
 * @param {U} keysToKeep - The keys you want to keep.
 * @returns Pick<T, (typeof keysToKeep)[number]>
 */
export function filterKeys<T extends Record<string, unknown>, U extends ReadonlyArray<keyof T>>(
  obj: T,
  keysToKeep: U,
) {
  // filter => car quelques clés sont optionnelles
  return Object.fromEntries(
    keysToKeep.filter((key) => obj[key]).map((key) => [key, obj[key]]),
  ) as Pick<T, (typeof keysToKeep)[number]>;
}

/**
 * It takes an object, an array of keys to compare, and a value to compare against. It returns true if
 * any of the keys in the object match the value
 * @param {T} item - T - the item to compare
 * @param keysToCompare - An array of keys to compare against.
 * @param {string} value - the value to search for
 * @returns A function that takes in an item, an array of keys, and a value.
 */
export function findValueInKeys<T>(item: T, keysToCompare: Array<keyof T>, value: string) {
  return keysToCompare.some((prop) => {
    if (!isObject(item)) return false;
    if (!item.hasOwnProperty(prop)) return false;

    const key = item[prop] as string;

    return key.toLowerCase().includes(value.toLowerCase());
  });
}
