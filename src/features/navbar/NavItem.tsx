import Link from 'next/link';

import classNames from 'classnames';
import { PropsWithChildren } from 'react';

import styles from '@/styles/Navbar.module.scss';

type NavItemProps = {
  href: string;
  pathname: string;
  locked?: boolean;
};

export default function NavItem({ href, pathname, children, locked }: PropsWithChildren<NavItemProps>) {
  return (
    <li className={styles.navItem}>
      <Link href={href} className={classNames(styles.navLink, pathname === href && styles.active, locked && styles.locked)}>
        {children}
      </Link>
    </li>
  );
}
