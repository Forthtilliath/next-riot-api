import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { LANGUAGES } from '@/utils/constantes';

import styles from '@/styles/Navbar.module.scss';

export default function SwitchLanguage({ classes = '' }) {
  return (
    <div className={classes}>
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
      className={classNames(styles.btn, { [styles.active]: active })}
      href={pathname}
      locale={language.locale}>
      <Image src={language.flag} alt={language.locale} width={64} height={64} />
    </Link>
  );
}
