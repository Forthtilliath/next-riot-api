export function isNonNull<T>(v: unknown): v is T {
  return v !== null;
}
