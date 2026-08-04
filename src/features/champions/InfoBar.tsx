import { getTranslations } from 'next-intl/server';
import { CSSProperties } from 'react';

import classNames from 'classnames';

import styles from '@/styles/Champion.module.scss';

type Props = {
  label: string;
  value: number;
  type: UnionInfos;
};

const typeClasses = {
  attack: styles.infobarAttack,
  defense: styles.infobarDefense,
  magic: styles.infobarMagic,
  difficulty: styles.infobarDifficulty,
};

export default async function InfoBar({ label, value, type }: Props) {
  const t = await getTranslations('champions');

  const percent = `${value * 10}%`;

  return (
    <div>
      <p className={styles.label}>{t('info.' + label)}</p>
      <div className={styles.infobarWrapper}>
        <div
          className={classNames(styles.infobar, typeClasses[type])}
          style={{ '--value': percent } as CSSProperties}>
          {value}
        </div>
      </div>
    </div>
  );
}
