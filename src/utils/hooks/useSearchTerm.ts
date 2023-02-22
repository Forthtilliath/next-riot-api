import { filterItems, ItemFiltered, UnionFilter } from "@/pages/items";
import { ChangeEvent, useState } from "react";
import { filterArrayOfEntries } from "../methods/array";

export function useSearchTerm<T extends ReturnType<typeof filterItems>>(
  data: T,
  propsToCompare: Array<UnionFilter>
) {
  const [value, setValue] = useState("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const dataFiltered = Object.entries(data).filter((dataItem) =>
    filterArrayOfEntries<ItemFiltered>(
      dataItem as [id: string, item: ItemFiltered],
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
