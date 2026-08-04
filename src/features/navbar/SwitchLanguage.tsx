'use client';

import Image from 'next/image';

import classNames from 'classnames';
import { useLocale } from 'next-intl';

import { Link, usePathname } from '@/i18n/navigation';
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
  const locale = useLocale();
  const pathname = usePathname();

  const active = locale === language.locale;

  return (
    <Link
      className={classNames(styles.btn, { [styles.active]: active })}
      href={pathname}
      locale={language.locale}>
      <Image src={language.flag} alt={language.locale} width={64} height={64} />
    </Link>
  );
}
