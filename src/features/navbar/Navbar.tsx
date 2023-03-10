import Image from 'next/image';

import { useRef, useState } from 'react';

import Burger from './Burger';
import Menu from './Menu';
import SwitchLanguage from './SwitchLanguage';

import styles from '@/styles/Navbar.module.scss';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const handleClickOverlay: ClickEvent<HTMLDivElement> = (e) => {
    if (e.target === overlayRef.current || e.target.hasAttribute('href')) {
      setOpen(false);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Image src={'/assets/LoL_icon.svg'} alt="logo" width={48} height={48} />
        <p>
          When it&apos;s Worth,
          <br />
          Thanks to Forth
        </p>
      </div>
      <Menu classes={styles.menu} />
      <SwitchLanguage classes={styles.switch} />

      <Burger active={open} toggle={() => setOpen((o) => !o)} />

      {/* Affichage tablette */}
      {open && (
        <div className={styles.overlay} onClick={handleClickOverlay} ref={overlayRef}>
          <div className={styles.mobile_menuWrapper}>
            <Menu classes={styles.mobile_menu} />
            <SwitchLanguage classes={styles.mobile_switch} />
          </div>
        </div>
      )}
    </header>
  );
}
