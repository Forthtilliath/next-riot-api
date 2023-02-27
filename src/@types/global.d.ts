/**
 * Simplifed version of setter of useState hook
 * @param **T** - Type of the value of useState hook
 */
type TSetter<T> = React.Dispatch<React.SetStateAction<T>>;

type Data = Record<string, unknown>;

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

type Items = Record<string, Item>;
type Item = {
  name: string;
  description: string;
  colloq: string;
  plaintext: string;
  from: string[];
  into: string[];
  image: {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
  };
  gold: {
    base: number;
    purchasable: boolean;
    total: number;
    sell: number;
  };
  tags: string[];
  maps: {
    "11": boolean;
    "12": boolean;
    "21": boolean;
    "22": boolean;
  };
  stats: Record<string, number>;
  depth: number;
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