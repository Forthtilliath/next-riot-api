import Image from 'next/image';
import Link from 'next/link';

import React from 'react';

import { getItemUrlImage } from '@/utils/api/apiRiot';

import styles from '@/styles/Items.module.scss';

type Props = Pick<ItemFiltered, 'image'> & { id: string };

export default function Item({ id, image }: Props) {
  return (
    <Link href={`/item/${id}`} className={styles.itemWrapper}>
      {/* 73px car 75px - 1px de border-left - 1px de border-right */}
      <Image alt="item" src={getItemUrlImage(image.full)} width={73} height={73} />
    </Link>
  );
}