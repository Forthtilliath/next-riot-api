import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Error from '@/features/Error';
import MainLayout from '@/features/layout/MainLayout';

import { getItem } from '@/utils/api/apiRiot';
import { ASSETS, DEFAULT_LOCALE, PATH } from '@/utils/constantes';
import { isNonNull } from '@/utils/methods/types';

import styles from '@/styles/Item.module.scss';

type Props = Awaited<ReturnType<typeof getServerSideProps>>['props'];

export default function Item({ item, error }: Props) {
  const router = useRouter();
  const { t } = useTranslation();

  if (error.hasError || !isNonNull<ItemDetails>(item)) {
    return <Error trans_key={'common:errors:fetch-item'} />;
  }

  const { name, description, gold, from, into, depth } = item;
  const id = router.query.id as string;

  return (
    <MainLayout title={name}>
      <h1>{name}</h1>

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
          <h2>{t('items:from')}</h2>
          {gold.base > 0 && (
            <div className={styles.fusionCost}>
              <span>{t('items:merge-cost')} : </span>
              <Image src={ASSETS + 'Gold.webp'} alt="Gold" width={16} height={12} />
              <span>{gold.base}</span>
            </div>
          )}
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
          <h2>{t('items:into')}</h2>
          <div className={styles.itemsWrapper}>
            {into.map((item, index) => (
              <Link key={`${item.id}-${index}`} href={`/item/${item.id}`} className={styles.link}>
                <Image alt="item" src={PATH.ITEM + item.id + '.png'} width={73} height={73} />
                <div>
                  <header className={styles.link_name}>{item.name}</header>

                  {depth === 3 ? (
                    <p className={styles.upgrade}>{t('items:upgrade-ornn')}</p>
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
    </MainLayout>
  );
}

export async function getServerSideProps({
  locale = DEFAULT_LOCALE,
  params,
}: GetServerSidePropsContext) {
  const item = (await getItem(locale, params?.id as string)) as ItemDetails | null;

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'items'])),
      item,
      error: {
        hasError: !item,
        key: 'common:errors:fetch-item',
      } as TError,
    },
  };
}
