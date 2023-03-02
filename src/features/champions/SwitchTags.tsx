// import { useTranslation } from 'next-i18next';
import React from 'react';

import { CHAMPION_TAGS } from '@/utils/constantes';

import RadioGroupControlled from '../RadioGroupControlled';

import styles from '@/styles/Champions.module.scss';

type Props = {
  tag: UnionTags | 'All';
  setTag: TSetter<UnionTags | 'All'>;
};

export default function SwitchTags({ tag, setTag }: Props) {
  return (
    <div className={styles.tagsWrapper}>
      <RadioGroupControlled setValue={setTag} value={tag}>
        <span className={styles.tag}>All</span>
        {CHAMPION_TAGS.map((tag) => (
          <span key={tag} className={styles.tag}>
            {tag}
          </span>
        ))}
      </RadioGroupControlled>
    </div>
  );
}
