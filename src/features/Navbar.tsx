import Link from "next/link";
import styles from "@/styles/Navbar.module.scss";
import clsx from "clsx";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";

export default function Navbar() {
  const { pathname } = useRouter();
  return (
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
        className={clsx(styles.navLink, pathname === href && styles.active)}
      >
        {children}
      </Link>
    </li>
  );
}
