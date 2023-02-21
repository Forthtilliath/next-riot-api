import { getItemUrlImage } from "@/apiRiot";
import Image from "next/image";
import React from "react";
import styles from "@/styles/Items.module.scss";

export default function Item({ name, image }: Partial<Item>) {
  return (
    <div className={styles.itemWrapper}>
      <div>
        {image && (
          <Image
            alt="item"
            src={getItemUrlImage(image.full)}
            width={50}
            height={50}
          />
        )}
      </div>
      <div className={styles.col_3}>{name}</div>
    </div>
  );
}
