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
export function filterKeys<T extends {}, U extends ReadonlyArray<keyof T>>(obj: T, keysToKeep: U) {
  return Object.fromEntries(
    keysToKeep.filter((key) => obj[key]).map((key) => [key, obj[key]]),
  ) as Pick<T, (typeof keysToKeep)[number]>;
}
