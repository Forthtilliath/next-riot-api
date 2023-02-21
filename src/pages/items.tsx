import Head from "next/head";
import stylesPage from "@/styles/Page.module.scss";
import styles from "@/styles/Items.module.scss";
import { getItems } from "@/apiRiot";
import { AxiosError } from "axios";
import Item from "@/features/items/Item";
import Searchbar from "@/features/Searchbar";
import { useSearchTerm } from "@/utils/hooks";
import { filterArrayOfEntries } from "@/utils/methods/array";

type Props = {
  items: ReturnType<typeof filterItems>;
  error: AxiosError;
};

type T = keyof ReturnType<typeof filterItems>[number][1]

export default function Items({ items, error }: Props) {
  // console.log(items);

  // if (error) return <h2>{error.message}</h2>;
  const [search, onChange, itemsFiltered] = useSearchTerm(items, [
    "name",
    // "colloq",
  ]);

  // const purchasableItems = items.filter(([, item]) => item.gold.purchasable);
  const purchasableItems = itemsFiltered.filter(
    ([, item]) => item.gold.purchasable
  );

  return (
    <>
      <Head>
        <title>League of Forth</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={stylesPage.main}>
        <h1 className={stylesPage.title}>ITEMS</h1>
        <menu className={styles.menu}>
          <Searchbar searchTerm={search} onChange={onChange} />
        </menu>
        <div className={styles.container}>
          {error && <h2>{error.message}</h2>}
          {purchasableItems.map(([key, item]) => (
            <Item key={key} {...item} />
          ))}
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const items = await getItems();

  return { props: { items: filterItems(items) } };
}

// type FilterItemsReturn = ReturnType<typeof filterItems>;
// type FilteredItemType = FilterItemsReturn[number][1];

export type UnionFilter = "name" | "gold" | "image";
export type ItemFiltered = Pick<Item, UnionFilter>;

export function filterItems(items: Items) {
  type Ids = keyof typeof items;
  const aItems = Object.entries(items) as Array<[Ids, Item]>;

  const aItemsFiltered = aItems.reduce<Array<[id: Ids, item: ItemFiltered]>>(
    (acc, [id, item]) => {
      const itemFiltered: ItemFiltered = {
        name: item.name,
        gold: item.gold,
        image: item.image,
      };
      const newItem = [id, itemFiltered] as [Ids, typeof itemFiltered];

      return [...acc, newItem];
    },
    []
  );
  return aItemsFiltered;
}
