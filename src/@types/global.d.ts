/**
 * Simplifed version of setter of useState hook
 * @param **T** - Type of the value of useState hook
 */
type TSetter<T> = React.Dispatch<React.SetStateAction<T>>;

type Data = Record<string, unknown>;

/**
 * Merge multiple types as one
 * @param T Type objects
 *
 * @example
 * type Product = {
 *  id: string;
 *  name: string;
 *  description: string;
 *  price: number;
 * }
 * type Cart = {
 *   quantity: number;
 * }
 *
 * type T = Merge<Product | Cart>
 * // Equals to
 * type T = {
 *  id: string;
 *  name: string;
 *  description: string;
 *  price: number;
 *  quantity: number;
 * }
 */
type Merge<U extends Record<string, unknown>> = {
  [K in U extends unknown ? keyof U : never]: U extends unknown
    ? K extends keyof U
      ? U[K]
      : never
    : never;
};

type Champion = {
  version: string;
  id: string;
  key: string;
  name: string;
  title: string;
  blurb: string;
  info: {
    attack: number;
    defense: number;
    magic: number;
    difficulty: number;
  };
  image: {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
  };
  tags: string[];
  partype: string;
  stats: {
    hp: number;
    hpperlevel: number;
    mp: number;
    mpperlevel: number;
    movespeed: number;
    armor: number;
    armorperlevel: number;
    spellblock: number;
    spellblockperlevel: number;
    attackrange: number;
    hpregen: number;
    hpregenperlevel: number;
    mpregen: number;
    mpregenperlevel: number;
    crit: number;
    critperlevel: number;
    attackdamage: number;
    attackdamageperlevel: number;
    attackspeedperlevel: number;
    attackspeed: number;
  };
};

type MapLol = {
  mapId: number;
  mapName: string;
  notes: string;
}

type THasError = {
  hasError: true;
  /** Key for translation */
  key: string;
}
type TNoError = {
  hasError: false;
}
type TError = THasError | TNoError;

type ObjectValues<T> = T[keyof T];