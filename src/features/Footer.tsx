import { getTranslations } from 'next-intl/server';

import styles from '@/styles/Layout.module.scss';

export default async function Footer() {
  const t = await getTranslations('common');

  return (
    <div className={styles.footer}>
      <p>
        &copy; {t('footer.coded-by')} - {t('footer.contest')}
      </p>
    </div>
  );
}
