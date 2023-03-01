import Image from 'next/image';
import { useRouter } from 'next/router';

import { useState } from 'react';

import Burger from './Burger';
import Menu from './Menu';
import SwitchLanguage from './SwitchLanguage';

import styles from '@/styles/Navbar.module.scss';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useRouter();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Image src={'/assets/LoL_icon.svg'} alt="logo" width={48} height={48} />
        <p>
          When it's Worth,
          <br />
          Thanks to Forth
        </p>
      </div>
      <Menu classes={styles.menu} />
      <SwitchLanguage classes={styles.switch} />

      <Burger active={open} toggle={() => setOpen((o) => !o)} />

      {open && (
        <div className={styles.overlay} onClick={() => setOpen(false)}>
          <div className={styles.mobile_menuWrapper}>
            <Menu classes={styles.mobile_menu} />
            <SwitchLanguage classes={styles.mobile_switch} />
          </div>
        </div>
      )}
    </header>
  );
}
