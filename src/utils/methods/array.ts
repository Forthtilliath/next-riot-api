import { isObject } from "./object";

export function filterArrayOfObjects<T>(
    item: T,
    propsToCompare: Array<keyof T>,
    value: string
  ) {
    return customFilter(item, propsToCompare, value);
  }
  
  export function filterArrayOfEntries<T>(
    [, item]: [id: string, item: T],
    propsToCompare: Array<keyof T>,
    value: string
  ) {
    return customFilter(item, propsToCompare, value);
  }
  
  export function customFilter<T>(
    item: T,
    propsToCompare: Array<keyof T>,
    value: string
  ) {
    return propsToCompare.some((prop) => {
      if (!isObject(item)) return false;
      if (!item.hasOwnProperty(prop)) return false;
  
      const key = item[prop] as string;
  
      return key.toLowerCase().includes(value.toLowerCase());
    });
  }