import Image from 'next/image';
import Link from 'next/link';

import React from 'react';

import { getItemUrlImage } from '@/utils/api/apiRiot';

import styles from '@/styles/Items.module.scss';

// type Props = Pick<Item, 'name' | 'image'>;
type Props = ItemFiltered & { id: string };

export default function Item({ id, name, image }: Props) {
  return (
    <Link href={`/item/${id}`} className={styles.itemWrapper}>
      <Image alt="item" src={getItemUrlImage(image.full)} width={73} height={73} />
    </Link>
  );
}

// export default function Item({ name, image }: Props) {
//   return (
//     <div className={styles.itemWrapper}>
//       <Image alt="item" src={getItemUrlImage(image.full)} width={73} height={73} />
//     </div>
//   );
// }

// export default function Item({ name, image }: Partial<Item>) {
//   return (
//     <div className={styles.itemWrapper}>
//       <div>{image && <Image alt="item" src={getItemUrlImage(image.full)} width={50} height={50} />}</div>
//       <div className={styles.col_3}>{name}</div>
//     </div>
//   );
// }
