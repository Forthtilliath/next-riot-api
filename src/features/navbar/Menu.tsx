import { useRouter } from 'next/router';

import { useTranslation } from 'next-i18next';

import NavItem from './NavItem';

export default function Menu({ classes = '' }) {
  const { pathname } = useRouter();
  const { t } = useTranslation();

  return (
    <menu className={classes}>
      {/* <NavItem pathname={pathname} href="/">
        {t('common:navbar:home')}
      </NavItem> */}
      <NavItem pathname={pathname} href="/champions/all">
        {t('common:navbar:champions', 'Champions')}
      </NavItem>
      <NavItem pathname={pathname} href="/items">
        {t('common:navbar:items', 'Items')}
      </NavItem>
    </menu>
  );
}
