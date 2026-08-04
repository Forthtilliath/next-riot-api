import Image from 'next/image';

import { getTranslations } from 'next-intl/server';

import Error from '@/features/Error';
import MainLayout from '@/features/layout/MainLayout';

import { Link } from '@/i18n/navigation';
import { getItem } from '@/utils/api/apiRiot';
import { ASSETS, DEFAULT_LOCALE, itemImgUrl } from '@/utils/constantes';

import styles from '@/styles/Item.module.scss';

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale = DEFAULT_LOCALE, id } = await params;
  const item = await getItem(locale, id);
  return { title: item ? `WiwottoF - ${item.name}` : 'WiwottoF' };
}

export default async function ItemPage({ params }: Props) {
  const { locale = DEFAULT_LOCALE, id } = await params;
  const item = (await getItem(locale, id)) as ItemDetails | null;
  const t = await getTranslations('items');

  if (!item) {
    return <Error trans_key="errors.fetch-item" />;
  }

  const { name, description, gold, from, into, depth } = item;

  return (
    <MainLayout>
      <h1>{name}</h1>

      <div className={styles.flex}>
        <div className={styles.rowLeft}>
          <Image alt="item" src={itemImgUrl(item.version, id)} width={150} height={150} />
          <div className={styles.cost}>
            <Image src={ASSETS + 'Gold.webp'} alt="Gold" width={20} height={15} />
            <span>{gold.total}</span>
          </div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: description }} className={styles.description} />
      </div>

      {from.length > 0 && (
        <section className={styles.section}>
          <h2>{t('from')}</h2>
          {gold.base > 0 && (
            <div className={styles.fusionCost}>
              <span>{t('merge-cost')} : </span>
              <Image src={ASSETS + 'Gold.webp'} alt="Gold" width={16} height={12} />
              <span>{gold.base}</span>
            </div>
          )}
          <div className={styles.itemsWrapper}>
            {from.map((item, index) => (
              <Link key={`${item.id}-${index}`} href={`/item/${item.id}`} className={styles.link}>
                <Image alt="item" src={itemImgUrl(item.version, item.id)} width={73} height={73} />
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
          <h2>{t('into')}</h2>
          <div className={styles.itemsWrapper}>
            {into.map((item, index) => (
              <Link key={`${item.id}-${index}`} href={`/item/${item.id}`} className={styles.link}>
                <Image alt="item" src={itemImgUrl(item.version, item.id)} width={73} height={73} />
                <div>
                  <header className={styles.link_name}>{item.name}</header>

                  {depth === 3 ? (
                    <p className={styles.upgrade}>{t('upgrade-ornn')}</p>
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
