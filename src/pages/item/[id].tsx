import { useRouter } from 'next/router';

import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import { getItem, getItems } from '@/utils/api/apiRiot';
import { DEFAULT_LOCALE } from '@/utils/constantes';

type Props = {
  item: Item;
};

export default function Item({ item }: Props) {
  const router = useRouter();
  const slug = (router.query.id as string[]) || [];

  console.log(item);

  return <div>Item</div>;
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

  if (!params?.id) {
    Object.assign(props, {
      error: { hasError: true, key: 'common:errors:no-id' },
    });
    return { props };
  }

  console.log('params.id', params.id);

  if (typeof params.id === 'string') {
    const item = await getItem(locale, params.id);

    console.log(item);

    if (item === undefined) {
      Object.assign(props, {
        error: { hasError: true, key: 'common:errors:fetch-item' },
      });
    } else {
      Object.assign(props, {
        item,
      });
    }

    return { props };
  }
}
