import Image from 'next/image';

import { useState } from 'react';

import styles from '@/styles/Champion.module.scss';

type Props = {
  images: string[];
};

export default function Slider({ images }: Props) {
  const [index, setIndex] = useState(0);

  const nbChildren = images.length;

  const next = () => setIndex((prev) => (prev + 1 + nbChildren) % nbChildren);
  const prev = () => setIndex((prev) => (prev - 1 + nbChildren) % nbChildren);

  return (
    <>
      <Image alt="Loading" src={images[index]} fill sizes={'(min-width: 600px) 300px, 0'} />
      <div className={styles.next} onClick={next}>
        <div className={styles.arrow} />
      </div>
      <div className={styles.prev} onClick={prev}>
        <div className={styles.arrow} />
      </div>
    </>
  );
}
