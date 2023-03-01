import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import Error from '@/features/Error';

import { getItem } from '@/utils/api/apiRiot';
import { APP_NAME, ASSETS, DEFAULT_LOCALE, PATH } from '@/utils/constantes';

import styles from '@/styles/Item.module.scss';
import stylesPage from '@/styles/Page.module.scss';

type Props = {
  item: ItemDetails;
  error: TError;
};

export default function Item({ item, error }: Props) {
  if (error.hasError) {
    return <Error trans_key={'common:errors:item-not-found'} />;
  }

  const { name, description, gold, from, into, depth } = item;
  const router = useRouter();
  const id = router.query.id as string;

  console.log(description);

  return (
    <>
      <Head>
        <title>{`${APP_NAME} - ${name}`}</title>
      </Head>

      <main className={styles.container}>
        <h1 className={stylesPage.title}>{name}</h1>
        <div className={styles.flex}>
          <div className={styles.rowLeft}>
            <Image alt="item" src={PATH.ITEM + id + '.png'} width={150} height={150} />
            <div className={styles.cost}>
              <Image src={ASSETS + 'Gold.webp'} alt="Gold" width={20} height={15} />
              <span>{gold.total}</span>
            </div>
          </div>
          <div dangerouslySetInnerHTML={{ __html: description }} className={styles.description} />
        </div>

        {from.length > 0 && (
          <section className={styles.section}>
            <h2 className={stylesPage.subTitle}>Items from</h2>
            <div className={styles.fusionCost}>
              <span>Coût de fusion : </span>
              <Image src={ASSETS + 'Gold.webp'} alt="Gold" width={16} height={12} />
              <span>{gold.base}</span>
            </div>
            <div className={styles.itemsWrapper}>
              {from.map((item, index) => (
                <Link key={`${item.id}-${index}`} href={`/item/${item.id}`} className={styles.link}>
                  <Image alt="item" src={PATH.ITEM + item.id + '.png'} width={73} height={73} />
                  <div>
                    <header className={styles.link_name}>{item.name}</header>
                    <div className={styles.cost}>
                      <Image src={ASSETS + 'Gold.webp'} alt="Gold" width={16} height={12} />
                      <span>{item.gold.total}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {into.length > 0 && (
          <section className={styles.section}>
            <h2 className={stylesPage.subTitle}>Items into</h2>
            <div className={styles.itemsWrapper}>
              {into.map((item, index) => (
                <Link key={`${item.id}-${index}`} href={`/item/${item.id}`} className={styles.link}>
                  <Image alt="item" src={PATH.ITEM + item.id + '.png'} width={73} height={73} />
                  <div>
                    <header className={styles.link_name}>{item.name}</header>

                    {depth === 3 ? (
                      <p className={styles.upgrade}>Amélioration de Ornn</p>
                    ) : (
                      <div className={styles.cost}>
                        <Image src={ASSETS + 'Gold.webp'} alt="Gold" width={16} height={12} />
                        <span>{item.gold.total}</span>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
        {/* maps */}
        {/* tags */}
      </main>
    </>
  );
}

export async function getServerSideProps({
  locale = DEFAULT_LOCALE,
  params,
}: GetServerSidePropsContext) {
  // Initialise les props avec les traductions et un array vide typé en cas d'erreur
  const props = {
    ...(await serverSideTranslations(locale, ['common', 'items'])),
    items: {} as Items,
    error: { hasError: false } as TError,
  };

  // TODO - Params avec ID - Name

  if (!params?.id) {
    Object.assign(props, {
      error: { hasError: true, key: 'common:errors:no-id' },
    });
    return { props };
  }

  if (typeof params.id === 'string') {
    const item = await getItem(locale, params.id);

    if (item === null) {
      Object.assign(props, {
        error: { hasError: true, key: 'common:errors:fetch-item' },
      });
    } else {
      Object.assign(props, {
        item,
      });
    }
  }

  return { props };
}
