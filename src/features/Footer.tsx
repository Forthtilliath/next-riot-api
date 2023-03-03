import { useTranslation } from 'next-i18next';

import styles from '@/styles/Layout.module.scss';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <div className={styles.footer}>
      <p>
        &copy; {t('common:footer:coded-by', 'Coded by Forth')} -{' '}
        {t('common:footer:contest', 'Contest #4: Using a REST API in a web creation')}
      </p>
    </div>
  );
}
