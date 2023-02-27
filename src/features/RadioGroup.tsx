import React, { PropsWithChildren, useEffect, useState } from 'react';

type Props = {
  callback?: Function;
};

type TChild = React.ReactElement;

/**
 * Control a group of children radio buttons or radio inputs. It adds 3 properties :
 * - `active`: to know if the child is active or not;
 * - `tabIndex`: to allow tabulation or not on the child;
 * - `click`: to control the change in value
 * @param {Function} [callback] - Function callback to call when the value is updated
 */
export default function RadioGroup({
  children,
  callback,
}: PropsWithChildren<Props>) {
  const childrenArray = React.Children.toArray(children) as TChild[];
  const firstChild = childrenArray[0];
  const [value, setValue] = useState(firstChild?.key);

  const updateValue = (child: TChild) => {
    setValue(child.key);
    callback && callback(child.props.children);
  };

  // Reset the state for when we change profile user page
  useEffect(() => {
    return () => {
      updateValue(firstChild);
    };
  }, []);

  return (
    <>
      {childrenArray.map((child) =>
        React.cloneElement(child, {
          active: (value === child.key).toString(),
          tabIndex: value === child.key ? -1 : 0,
          onClick: () => updateValue(child),
        })
      )}
    </>
  );
}
