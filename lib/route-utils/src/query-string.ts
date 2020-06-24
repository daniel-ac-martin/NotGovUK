import { parse as _parse, stringify } from 'qs';

export const parse = s => _parse(s && s.replace && s.replace(/^\?/, ''));
export const queryString = (obj: object) => '?' + stringify(obj);

export { stringify };
