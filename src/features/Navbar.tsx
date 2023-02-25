import Link from "next/link";
import styles from "@/styles/Navbar.module.scss";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";
import SwitchLanguage from "./SwitchLanguage";
import classNames from "classnames";
import Image from "next/image";

export default function Navbar() {
  const { pathname } = useRouter();
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Image src={"/assets/LoL_icon.svg"} alt="logo" width={48} height={48} />
        <p>When it's Worth,<br/>Thanks to Forth</p>
      </div>
      <menu className={styles.menu}>
        <NavItem pathname={pathname} href="/">
          Home
        </NavItem>
        <NavItem pathname={pathname} href="/champions">
          Champions
        </NavItem>
        <NavItem pathname={pathname} href="/items">
          Items
        </NavItem>
      </menu>
      <SwitchLanguage />
    </header>
  );
}

type NavItemProps = {
  href: string;
  pathname: string;
};

function NavItem({
  href,
  pathname,
  children,
}: PropsWithChildren<NavItemProps>) {
  return (
    <li className={styles.navItem}>
      <Link
        href={href}
        className={classNames(
          styles.navLink,
          pathname === href && styles.active
        )}
      >
        {children}
      </Link>
    </li>
  );
}
