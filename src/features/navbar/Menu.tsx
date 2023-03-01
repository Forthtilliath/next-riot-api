import { useRouter } from 'next/router';

import React from 'react';
import { useTranslation } from 'react-i18next';


import NavItem from './NavItem';

export default function Menu({ classes = '' }) {
  const { pathname } = useRouter();
  const { t } = useTranslation();

  return (
    <menu className={classes}>
      <NavItem pathname={pathname} href="/">
        {t('common:navbar:home')}
      </NavItem>
      <NavItem pathname={pathname} href="/champions">
        {t('common:navbar:champions')}
      </NavItem>
      <NavItem pathname={pathname} href="/items">
        {t('common:navbar:items')}
      </NavItem>
    </menu>
  );
}