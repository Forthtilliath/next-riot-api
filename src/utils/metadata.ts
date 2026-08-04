import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function buildMetadata(title: string): Promise<Metadata> {
  const t = await getTranslations('common');

  return {
    title: `WiwottoF - ${title}`,
    description: t('layout.description'),
  };
}
