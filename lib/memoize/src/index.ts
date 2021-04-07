type Key = string | number | symbol;

type MemoizableFunction<A extends Key, B> = (v: A) => B;

export const memoize = <A extends Key, B>(f: MemoizableFunction<A, B>): MemoizableFunction<A, B> => {
  const memo: Record<A, B> = {} as Record<A, B>;

  return (v: A): B => {
    const cached = memo[v];

    return (
      cached === undefined
        ? memo[v] = f(v)
        : cached
    );
  };
};

export default memoize;
