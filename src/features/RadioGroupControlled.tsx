import React, { PropsWithChildren } from 'react';

type Props<T> = {
  setValue: TSetter<T>;
  value: T;
};

type ChildProps = {
  children?: React.ReactNode;
  active?: string;
  tabIndex?: number;
  onClick?: () => void;
};

type TChild = React.ReactElement<ChildProps>;

/**
 * Control a group of children radio buttons or radio inputs. The difference between RadioGroup &
 * RadioGroupControlled, it's the management of the value.
 * 
 * It adds 3 properties :
 * - `active`: to know if the child is active or not;
 * - `tabIndex`: to allow tabulation or not on the child;
 * - `click`: to control the change in value
 * @param {Function} [callback] - Function callback to call when the value is updated
 */
export default function RadioGroupControlled<T>({
  children,
  setValue,
  value,
}: PropsWithChildren<Props<T>>) {
  const childrenArray = React.Children.toArray(children) as TChild[];

  return (
    <>
      {childrenArray.map((child) =>
        React.cloneElement(child, {
          active: (value === child.props.children).toString(),
          tabIndex: value === child.props.children ? -1 : 0,
          onClick: () => setValue(child.props.children as T),
        }),
      )}
    </>
  );
}
