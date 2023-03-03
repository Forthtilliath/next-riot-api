import Image from 'next/image';
import Link from 'next/link';

import React from 'react';

import { PATH } from '@/utils/constantes';

import styles from '@/styles/Champions.module.scss';

type Props = Pick<Champion, 'id' | 'name'>;

export default function LinkToChampion({ id, name }: Props) {
  return (
    <Link href={`/champion/${id}`} className={styles.championWrapper}>
      {/* 73px car 75px - 1px de border-left - 1px de border-right */}
        <Image alt={name} src={PATH.CHAMPION + id + '.png'} fill />
      {/* <Image alt={name} src={PATH.CHAMPION + id + '.png'} width={73} height={73} /> */}
    </Link>
  );
}
