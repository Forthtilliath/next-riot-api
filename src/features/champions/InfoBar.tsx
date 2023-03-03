import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import React, { CSSProperties } from 'react';

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

export default function InfoBar({ label, value, type }: Props) {
  const { t } = useTranslation();

  const percent = `${value * 10}%`;

  return (
    <div>
      <p className={styles.label}>{t('champions:info:' + label)}</p>
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
