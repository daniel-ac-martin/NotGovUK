import parse from 'url-parse';

type _ParsedURL = ReturnType<typeof parse>;

type ParsedURL = _ParsedURL & {
  query: object
  search: string
};

export const urlParse = (s: string): ParsedURL => {
  const wrap = (parsed: _ParsedURL) => {
    const oldSet = parsed.set.bind(parsed);
    const oldToString = parsed.toString.bind(parsed);
    const search = <unknown>parsed.query as string;
    const searchParams = new URLSearchParams(search);
    const query = Object.fromEntries(searchParams);
    const toString = () => oldToString();

    const set = function(p: string, v: any) {
      const part = (
        p === 'search'
          ? 'query'
          : p
      );
      const value = (
        p === 'query'
          ? (new URLSearchParams(v)).toString()
          : v
      );

      return wrap(oldSet(part as any, value));
    }

    return {
      ...parsed,
      query,
      set,
      search,
      searchParams,
      toString
    };
  };

  return wrap(new parse(s, {}, false));
};
