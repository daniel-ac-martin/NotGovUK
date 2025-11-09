export type Maybe<T> = T | undefined;

export const id = <T>(v: T): T => v;
export const isDefined = (v: any): boolean => (
  v !== undefined && v !== ''
);
