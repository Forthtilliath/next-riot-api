import { LANGUAGES } from "@/utils/constantes";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import React from "react";
import styles from "@/styles/Navbar.module.scss";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";

export default function SwitchLanguage() {
  return (
    <div className={styles.btnsWrapper}>
      {LANGUAGES.map((lang) => (
        <ButtonLanguage key={lang.trans_key} language={lang} />
      ))}
    </div>
  );
}

type ButtonProps = {
  language: TLanguage;
};
export function ButtonLanguage({ language }: ButtonProps) {
  const { i18n } = useTranslation();

  const active = i18n.language === language.trans_key;
  const { pathname } = useRouter();

  return (
    <Link
      // onClick={() => i18n.changeLanguage(language.trans_key)}
      className={classNames(styles.btn, { [styles.active]: active })}
      href={pathname}
      locale={language.trans_key}
    >
      <Image
        src={language.image}
        alt={language.trans_key}
        width={64}
        height={64}
      />
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
