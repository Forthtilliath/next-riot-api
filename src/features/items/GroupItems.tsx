import LinkToItem from '@/features/items/LinkToItem';

import styles from '@/styles/Items.module.scss';

type Props = {
  name: string;
  items: [string, ItemFiltered][];
};

export default function GroupItems({ name, items }: Props) {
  if (items.length === 0) return null;

  // Tri les objets du moins cher au plus cher
  items.sort(([, itemA], [, itemB]) => itemA.gold.total - itemB.gold.total);

  return (
    <section className={styles.groupItems}>
      <h3>{name}</h3>
      <div className={styles.itemsWrapper}>
        {items.map(([key, item]) => (
          <LinkToItem key={key} id={key} {...item} />
        ))}
      </div>
    </section>
  );
}
