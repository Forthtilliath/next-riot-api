import { useTranslation } from 'next-i18next';

import MainLayout from './layout/MainLayout';

type Props = {
  trans_key: string;
};

export default function Error({ trans_key }: Props) {
  const { t } = useTranslation();
  return (
    <MainLayout title={t(trans_key)}>
      <h1>{t(trans_key)}</h1>
    </MainLayout>
  );
}
