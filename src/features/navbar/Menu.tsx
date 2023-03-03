import { useRouter } from 'next/router';

import { useTranslation } from 'next-i18next';
import React from 'react';

import NavItem from './NavItem';

export default function Menu({ classes = '' }) {
  const { pathname } = useRouter();
  const { t } = useTranslation();

  return (
    <menu className={classes}>
      {/* <NavItem pathname={pathname} href="/">
        {t('common:navbar:home')}
      </NavItem> */}
      <NavItem pathname={pathname} href="/champions">
        {t('common:navbar:champions')}
      </NavItem>
      <NavItem pathname={pathname} href="/items">
        {t('common:navbar:items')}
      </NavItem>
      <NavItem pathname={pathname} href="/runes" locked>
        {t('common:navbar:runes')}
      </NavItem>
    </menu>
  );
}
