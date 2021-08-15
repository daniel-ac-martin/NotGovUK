import parse from 'url-parse';
import { parse as qsParse, stringify as qsStringify } from './query-string';

export const urlParse = (s: string) => {
  const wrap = (parsed) => {
    const oldSet = parsed.set.bind(parsed);
    const oldToString = parsed.toString.bind(parsed);
    const search = <unknown>parsed.query as string;
    const query = qsParse(search);
    const toString = () => oldToString();

    const set = function(p: string, v) {
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

      return wrap(oldSet(part, value));
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
