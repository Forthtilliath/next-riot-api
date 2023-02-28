import React from 'react';

// import { ItemFiltered } from '@/pages/items';
import Item from '@/features/items/Item';

import styles from '@/styles/Items.module.scss';

type Props = {
  name: string;
  items: [string, ItemFiltered][];
};

export default function GroupItems({ name, items }: Props) {
  if (items.length === 0) return null;

  items.sort(([,itemA],[,itemB]) => itemA.gold.total - itemB.gold.total)

  return (
    <div className={styles.groupItems}>
      <h3>{name}</h3>
      <div className={styles.itemsWrapper}>
        {items.map(([key, item]) => (
          <Item key={key} id={key} {...item} />
        ))}
      </div>
    </div>
  );
}
