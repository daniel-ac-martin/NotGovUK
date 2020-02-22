import { parse as qsParse, stringify } from 'qs';

const parse = s => qsParse(s && s.replace && s.replace(/^\?/, ''));

export {
  parse,
  stringify
};
