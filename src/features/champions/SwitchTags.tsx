import { useTranslation } from 'next-i18next';
import React from 'react';

import { CHAMPION_TAGS } from '@/utils/constantes';

import RadioGroup from '../RadioGroup';

import styles from '@/styles/Champions.module.scss';

type Props = {
  setTag: TSetter<UnionTags | 'All'>;
};

export default function SwitchTags({ setTag }: Props) {
  const { t } = useTranslation();

  return (
    <div className={styles.tagsWrapper}>
      <RadioGroup callback={setTag}>
        <span className={styles.tag}>All</span>
        {CHAMPION_TAGS.map((tag) => (
          <span key={tag} className={styles.tag}>
            {/* {t(`champions:tags:${tag}`)} */}
            {tag}
          </span>
        ))}
      </RadioGroup>
    </div>
  );
}
