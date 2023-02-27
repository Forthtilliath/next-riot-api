import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import classNames from 'classnames';
import { useTranslation } from 'next-i18next';

import { LANGUAGES } from '@/utils/constantes';

import styles from '@/styles/Navbar.module.scss';

export default function SwitchLanguage() {
  return (
    <div className={styles.btnsWrapper}>
      {LANGUAGES.map((lang) => (
        <ButtonLanguage key={lang.locale} language={lang} />
      ))}
    </div>
  );
}

type ButtonProps = {
  language: TLanguage;
};
export function ButtonLanguage({ language }: ButtonProps) {
  const { i18n } = useTranslation();

  const active = i18n.language === language.locale;
  const { pathname } = useRouter();

  return (
    <Link
      // onClick={() => i18n.changeLanguage(language.trans_key)}
      className={classNames(styles.btn, { [styles.active]: active })}
      href={pathname}
      locale={language.locale}
    >
      <Image src={language.flag} alt={language.locale} width={64} height={64} />
    </Link>
  );
  // return (
  //   <button
  //     onClick={() => i18n.changeLanguage(language.trans_key)}
  //     className={classNames(styles.btn, { [styles.active]: active })}
  //   >
  //     <Image
  //       src={language.image}
  //       alt={language.trans_key}
  //       width={64}
  //       height={64}
  //     />
  //   </button>
  // );
}
