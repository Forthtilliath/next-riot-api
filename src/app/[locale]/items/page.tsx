import { getTranslations } from 'next-intl/server';

import ItemsClient from './ItemsClient';

import { getItems, getLatestVersion } from '@/utils/api/apiRiot';
import { DEFAULT_LOCALE } from '@/utils/constantes';
import { filterKeysOfItems } from '@/utils/items';
import { buildMetadata } from '@/utils/metadata';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'items' });
  return buildMetadata(t('title'));
}

export default async function ItemsPage({ params }: Props) {
  const { locale = DEFAULT_LOCALE } = await params;
  const [items, version] = await Promise.all([getItems(locale), getLatestVersion()]);

  return (
    <ItemsClient
      items={filterKeysOfItems(items)}
      version={version}
      hasError={!items || Object.keys(items).length === 0}
    />
  );
}
