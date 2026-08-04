import Image from 'next/image';
import Link from 'next/link';

import { itemImgUrl } from '@/utils/constantes';

import styles from '@/styles/Items.module.scss';

type Props = { id: string; version: string };

export default function LinkToItem({ id, version }: Props) {
  return (
    <Link href={`/item/${id}`} className={styles.itemWrapper}>
      <Image alt="item" src={itemImgUrl(version, id)} fill sizes='100px' />
    </Link>
  );
}
