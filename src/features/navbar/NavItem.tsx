import Link from 'next/link';

import classNames from 'classnames';
import { PropsWithChildren } from 'react';

import styles from '@/styles/Navbar.module.scss';

type NavItemProps = {
  href: string;
  pathname: string;
};

export default function NavItem({ href, pathname, children }: PropsWithChildren<NavItemProps>) {
  return (
    <li className={styles.navItem}>
      <Link href={href} className={classNames(styles.navLink, pathname === href && styles.active)}>
        {children}
      </Link>
    </li>
  );
}
