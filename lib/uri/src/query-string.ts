import { ParsedQs as Query, parse, stringify } from 'qs';

export const qsParse = (s: string): Query => parse(
  s && s[0] === '?'
    ? s?.substring(1)
    : s
);

export const queryString = (obj: object): string => '?' + stringify(obj);

export type { Query };
