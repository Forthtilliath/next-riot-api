import { PropsWithChildren } from 'react';

import styles from '@/styles/Layout.module.scss';

export default function MainLayout({ children }: PropsWithChildren) {
  return <main className={styles.main}>{children}</main>;
}
