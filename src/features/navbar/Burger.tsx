import classNames from 'classnames';

import styles from '@/styles/Burger.module.scss';

type Props = {
  active: boolean;
  toggle: () => void;
};

export default function Burger({ active, toggle }: Props) {
  return (
    <div className={classNames(styles.burger, active && styles.active)} onClick={toggle}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}
