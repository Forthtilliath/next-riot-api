import Image from 'next/image';
import Link from 'next/link';

import React from 'react';

import { PATH } from '@/utils/constantes';

type Props = Pick<Champion, 'id' | 'name'> & {
  styles: {
    readonly [key: string]: string;
  };
};

export default function LinkToChampion({ id, name, styles }: Props) {
  return (
    <Link href={`/champion/${id.toLowerCase()}`} className={styles.championWrapper}>
      <Image alt={name} src={PATH.CHAMPION + id + '.png'} fill sizes='100px' />
    </Link>
  );
}
