import Image from 'next/image';
import { useRouter } from 'next/router';

import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import { getItem, getItems, getItemUrlImage } from '@/utils/api/apiRiot';
import { DEFAULT_LOCALE } from '@/utils/constantes';

type Props = {
  item: Item;
};

export default function Item({ item: { name, image, description, plaintext, ...o } }: Props) {
  const router = useRouter();
  const slug = (router.query.id as string[]) || [];

  console.log(o);

  return (
    <div>
      <h1>{name}</h1>
      <Image alt="item" src={getItemUrlImage(image.full)} width={150} height={150} />
      <p>{description}</p>
      <p>{plaintext}</p>
      {/* from & into */}
      {/* maps */}
      {/* tags */}
      {/* gold : base & total */}
    </div>
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

  if (!params?.id) {
    Object.assign(props, {
      error: { hasError: true, key: 'common:errors:no-id' },
    });
    return { props };
  }

  if (typeof params.id === 'string') {
    const item = await getItem(locale, params.id);

    if (item === undefined) {
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
