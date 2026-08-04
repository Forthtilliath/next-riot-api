'use client';

import { useTranslations } from 'next-intl';

import { usePathname } from '@/i18n/navigation';

import NavItem from './NavItem';

export default function Menu({ classes = '' }) {
  const pathname = usePathname();
  const t = useTranslations('common');

  return (
    <menu className={classes}>
      <NavItem pathname={pathname} href="/champions/all">
        {t('navbar.champions')}
      </NavItem>
      <NavItem pathname={pathname} href="/items">
        {t('navbar.items')}
      </NavItem>
    </menu>
  );
}
