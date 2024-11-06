import { ParsedQs as Query, parse as _parse, stringify } from 'qs';

export const parse = (s: string): Query => _parse(
  s && s[0] === '?'
    ? s?.substring(1)
    : s
);

export const queryString = (obj: object): string => '?' + stringify(obj);

export type { Query };
