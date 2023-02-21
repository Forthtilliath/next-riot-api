import { ChangeEvent, useState } from "react";

export default function useSearchTerm<T>(
  data: Array<T>,
  propsToCompare: Array<string>
) {
    const [value, setValue] = useState("");
    
    const onChange = (e:ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

  const dataFiltered = data.filter((item) => item);

  return [value, onChange, dataFiltered] as const;
}

// name, colloq (array)
