import Image from 'next/image';
import Link from 'next/link';

import { PATH } from '@/utils/constantes';

import styles from '@/styles/Items.module.scss';

type Props = { id: string };

export default function LinkToItem({ id }: Props) {
  return (
    <Link href={`/item/${id}`} className={styles.itemWrapper}>
      <Image alt="item" src={PATH.ITEM + id + '.png'} fill sizes='100px' />
    </Link>
  );
}
