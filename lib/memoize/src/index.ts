type MemoizableFunction<A, B> = (v: A) => B;

export const memoize = <A, B>(f: MemoizableFunction<A, B>): MemoizableFunction<A, B> => {
  const memo: Map<A, B> = new Map();

  return (a: A): B => {
    const cached = memo.get(a);

    if (cached === undefined) {
      const result = f(a);

      memo.set(a, result);

      return result;
    } else {
      return cached;
    }
  };
};

export default memoize;
