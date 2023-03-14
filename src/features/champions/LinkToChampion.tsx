import Image from 'next/image';
import Link from 'next/link';

import { PATH } from '@/utils/constantes';

type Props = Pick<Champion, 'id' | 'name'> & {
  styles: {
    readonly [key: string]: string;
  };
};

export default function LinkToChampion({ id, name, styles }: Props) {
  return (
    <Link
      href={`/champion/${id.toLowerCase()}`}
      className={styles.championWrapper}
      style={{ position: 'relative' }}>
      <Image
        alt={name}
        src={PATH.CHAMPION + id + '.png'}
        fill
        sizes="100px"
        placeholder="blur"
        blurDataURL={'data:image/svg+xml;base64,PHN2ZyB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIg0KICAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyINCiAgICB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4wIiB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4IiB2aWV3Qm94PSIwIDAgMTI4IDEyOCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQogICAgPGcgc3R5bGU9InRyYW5zbGF0ZTpjYWxjKDUwJSAtIDMycHgpIGNhbGMoNTAlIC0gMzJweCkiPg0KICAgICAgICA8Y2lyY2xlIGN4PSI4IiBjeT0iMzIiIHI9IjgiIGZpbGw9IiMwMDk1ZmYiLz4NCiAgICAgICAgPGNpcmNsZSBjeD0iOCIgY3k9IjMyIiByPSI4IiBmaWxsPSIjNTViOGZmIiB0cmFuc2Zvcm09InJvdGF0ZSg0NSwzMiwzMikiLz4NCiAgICAgICAgPGNpcmNsZSBjeD0iOCIgY3k9IjMyIiByPSI4IiBmaWxsPSIjOTRkM2ZmIiB0cmFuc2Zvcm09InJvdGF0ZSg5MCwzMiwzMikiLz4NCiAgICAgICAgPGNpcmNsZSBjeD0iOCIgY3k9IjMyIiByPSI4IiBmaWxsPSIjY2NlYWZmIiB0cmFuc2Zvcm09InJvdGF0ZSgxMzUsMzIsMzIpIi8+DQogICAgICAgIDxjaXJjbGUgY3g9IjgiIGN5PSIzMiIgcj0iOCIgZmlsbD0iI2UxZjNmZiIgdHJhbnNmb3JtPSJyb3RhdGUoMTgwLDMyLDMyKSIvPg0KICAgICAgICA8Y2lyY2xlIGN4PSI4IiBjeT0iMzIiIHI9IjgiIGZpbGw9IiNlMWYzZmYiIHRyYW5zZm9ybT0icm90YXRlKDIyNSwzMiwzMikiLz4NCiAgICAgICAgPGNpcmNsZSBjeD0iOCIgY3k9IjMyIiByPSI4IiBmaWxsPSIjZTFmM2ZmIiB0cmFuc2Zvcm09InJvdGF0ZSgyNzAsMzIsMzIpIi8+DQogICAgICAgIDxjaXJjbGUgY3g9IjgiIGN5PSIzMiIgcj0iOCIgZmlsbD0iI2UxZjNmZiIgdHJhbnNmb3JtPSJyb3RhdGUoMzE1LDMyLDMyKSIvPg0KICAgICAgICA8YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InJvdGF0ZSIgdmFsdWVzPSI0NSAzMiAzMjs5MCAzMiAzMjsxMzUgMzIgMzI7MTgwIDMyIDMyOzIyNSAzMiAzMjsyNzAgMzIgMzI7MzE1IDMyIDMyOzAgMzIgMzIiIGNhbGNNb2RlPSJkaXNjcmV0ZSIgZHVyPSIxMTIwbXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+DQogICAgPC9nPg0KPC9zdmc+'}
      />
    </Link>
  );
}
