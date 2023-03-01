import { useRouter } from 'next/router';

import React from 'react';

import NavItem from './NavItem';

import styles from '@/styles/Navbar.module.scss';

export default function Menu({ classes = '' }) {
  const { pathname } = useRouter();

  return (
    <menu className={classes}>
      <NavItem pathname={pathname} href="/">
        Home
      </NavItem>
      <NavItem pathname={pathname} href="/champions">
        Champions
      </NavItem>
      <NavItem pathname={pathname} href="/items">
        Items
      </NavItem>
    </menu>
  );
}
