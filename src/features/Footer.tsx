import { useTranslation } from 'next-i18next';

import styles from '@/styles/Layout.module.scss';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <div className={styles.footer}>
      <p>
        &copy; {t('common:footer:coded-by')} - {t('common:footer:contest')}
      </p>
    </div>
  );
}
