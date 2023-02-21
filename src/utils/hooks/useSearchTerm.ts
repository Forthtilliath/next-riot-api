import { filterItems, ItemFiltered, UnionFilter } from "@/pages/items";
import { ChangeEvent, useState } from "react";
import { filterArrayOfEntries } from "../methods/array";

export function useSearchTerm<T extends ReturnType<typeof filterItems>>(
  data: T,
  propsToCompare: Array<UnionFilter>
  // propsToCompare: Array<keyof T[number][1]>
) {
  const [value, setValue] = useState("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const dataFiltered = data.filter((dataItem) =>
    filterArrayOfEntries<ItemFiltered>(
      dataItem,
      propsToCompare,
      value
    )
  );

  const reset = () => setValue('');

  return [value, onChange, dataFiltered, reset] as const;
}

// name, colloq (array)

// props with . ou / => path

// https://decipher.dev/30-seconds-of-typescript/docs/
// https://github.com/total-typescript/ts-reset
