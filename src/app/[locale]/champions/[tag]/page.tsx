import { getTranslations } from 'next-intl/server';

import ChampionsClient from './ChampionsClient';

import { getChampions } from '@/utils/api/apiRiot';
import { DEFAULT_LOCALE } from '@/utils/constantes';
import { filterKeysOfArrayObjects } from '@/utils/methods/array';
import { buildMetadata } from '@/utils/metadata';

const keysToKeep = ['key', 'id', 'name', 'tags', 'version'] as const;

type Props = {
  params: Promise<{ locale: string; tag: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'champions' });
  return buildMetadata(t('title'));
}

export default async function ChampionsPage({ params }: Props) {
  const { locale = DEFAULT_LOCALE, tag } = await params;
  const champions = Object.values(await getChampions(locale));

  return (
    <ChampionsClient
      champions={filterKeysOfArrayObjects(champions, keysToKeep)}
      initialTag={tag}
      hasError={!champions || champions.length === 0}
    />
  );
}
