import React, { PropsWithChildren } from 'react';

type Props = {
  setValue: TSetter<any>;
  value: any;
};

type TChild = React.ReactElement;

/**
 * Control a group of children radio buttons or radio inputs. It adds 3 properties :
 * - `active`: to know if the child is active or not;
 * - `tabIndex`: to allow tabulation or not on the child;
 * - `click`: to control the change in value
 * @param {Function} [callback] - Function callback to call when the value is updated
 */
export default function RadioGroupControlled({
  children,
  setValue,
  value,
}: PropsWithChildren<Props>) {
  const childrenArray = React.Children.toArray(children) as TChild[];

  return (
    <>
      {childrenArray.map((child) =>
        React.cloneElement(child, {
          active: (value === child.props.children).toString(),
          tabIndex: value === child.props.children ? -1 : 0,
          onClick: () => setValue(child.props.children),
        }),
      )}
    </>
  );
}
