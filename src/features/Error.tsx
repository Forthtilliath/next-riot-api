'use client';

import { useTranslations } from 'next-intl';

import MainLayout from './layout/MainLayout';

type Props = {
  trans_key: string;
};

export default function Error({ trans_key }: Props) {
  const t = useTranslations('common');
  return (
    <MainLayout>
      <h1>{t(trans_key)}</h1>
    </MainLayout>
  );
}
