import { parse as _parse, stringify } from 'qs';

export const parse = (s: string): object => _parse(s && s.replace && s.replace(/^\?/, ''));
export const queryString = (obj: object): string => '?' + stringify(obj);

export { stringify };
