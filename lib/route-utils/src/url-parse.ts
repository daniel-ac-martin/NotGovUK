import parse from 'url-parse';
import { parse as qsParse, stringify as qsStringify } from './query-string';

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
    const query = qsParse(search);
    const toString = () => oldToString();

    const set = function(p: string, v: any) {
      const part = (
        p === 'search'
          ? 'query'
          : p
      );
      const value = (
        p === 'query'
          ? qsStringify(v)
          : v
      );

      return wrap(oldSet(part as any, value));
    }

    return {
      ...parsed,
      query,
      set,
      search,
      toString
    };
  };

  return wrap(new parse(s, {}, false));
};
