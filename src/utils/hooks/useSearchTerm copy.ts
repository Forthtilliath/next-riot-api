import { ChangeEvent, useState } from "react";
import { filterArrayOfEntries } from "../methods/array";

export function useSearchTerm<T extends unknown>(
  data: Array<T>,
  propsToCompare: Array<string>,
) {
  const [value, setValue] = useState("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const dataFiltered = data.filter((dataItem) =>
    filterArrayOfEntries(
      dataItem as [id: string, value: T],
      propsToCompare as Array<keyof T>,
      value
    )
  );

  return [value, onChange, dataFiltered] as const;
}

// name, colloq (array)

// props with . ou / => path

// https://decipher.dev/30-seconds-of-typescript/docs/
// https://github.com/total-typescript/ts-reset
