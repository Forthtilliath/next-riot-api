import Image from 'next/image';
import Link from 'next/link';

import React from 'react';

import { PATH } from '@/utils/constantes';

import styles from '@/styles/Items.module.scss';

type Props = { id: string };

export default function LinkToItem({ id }: Props) {
  return (
    <Link href={`/item/${id}`} className={styles.itemWrapper}>
      {/* 73px car 75px - 1px de border-left - 1px de border-right */}
      <Image alt="item" src={PATH.ITEM + id + '.png'} width={73} height={73} />
    </Link>
  );
}
