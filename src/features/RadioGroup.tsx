'use client';

import React, { PropsWithChildren, useEffect, useState } from 'react';

type Props<T> = {
  callback?: (value: T) => void;
};

type ChildProps = {
  children?: React.ReactNode;
  active?: string;
  tabIndex?: number;
  onClick?: () => void;
};

type TChild = React.ReactElement<ChildProps>;

/**
 * Control a group of children radio buttons or radio inputs. It adds 3 properties :
 * - `active`: to know if the child is active or not;
 * - `tabIndex`: to allow tabulation or not on the child;
 * - `click`: to control the change in value
 * @param {Function} [callback] - Function callback to call when the value is updated
 */
export default function RadioGroup<T>({ children, callback }: PropsWithChildren<Props<T>>) {
  const childrenArray = React.Children.toArray(children) as TChild[];
  const firstChild = childrenArray[0];
  const [value, setValue] = useState(firstChild?.key);

  const updateValue = (child: TChild) => {
    setValue(child.key);
    callback?.(child.props.children as T);
  };

  // Reset the state for when we change profile user page
  useEffect(() => {
    return () => {
      updateValue(firstChild);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {childrenArray.map((child) =>
        React.cloneElement(child, {
          active: (value === child.key).toString(),
          tabIndex: value === child.key ? -1 : 0,
          onClick: () => updateValue(child),
        }),
      )}
    </>
  );
}
