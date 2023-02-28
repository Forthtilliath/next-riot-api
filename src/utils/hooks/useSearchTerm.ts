// import { filterItems, ItemFiltered, UnionFilterItems } from "@/pages/items";
import { ChangeEvent, useState } from 'react';

import { filterKeysOfItems } from '@/pages/items';

import { filterEntry } from '../methods/array';

/**
 * Filtres les données à partir du searchTerm sur le tableau de clés passé en argument.
 * @param {T} data - Données à filtrer
 * @param propsToCompare - Clés sur lesquels le searchTerm doit chercher
 * @returns Données filtrées à partir des clés choisies et du searchTerm
 */
export function useSearchTerm<T extends ReturnType<typeof filterKeysOfItems>>(
  data: T,
  propsToCompare: Array<UnionFilterItems>,
) {
  const [value, setValue] = useState('');

  /**
   * Callback which change the searchTerm
   * @param event - ChangeEvent<HTMLInputElement>
   */
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  /** Data filtered based on the search term. */
  const dataFiltered = Object.entries(data).filter((dataItem) =>
    filterEntry(dataItem, propsToCompare, value),
  );

  /**
   *Sets the value of the searchTerm to an empty string.
   */
  const reset = () => setValue('');

  return [value, onChange, dataFiltered, reset] as const;
}

// https://decipher.dev/30-seconds-of-typescript/docs/
// https://github.com/total-typescript/ts-reset
