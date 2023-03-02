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



type MapLol = {
  mapId: number;
  mapName: string;
  notes: string;
};

type THasError = {
  hasError: true;
  /** Key for translation */
  key: string;
};
type TNoError = {
  hasError: false;
};
type TError = THasError | TNoError;

type ObjectValues<T> = T[keyof T];

type ClickEvent<T extends HTMLElement> = (event: React.MouseEvent<T> & { target: T }) => void;
