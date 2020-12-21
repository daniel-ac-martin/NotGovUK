import parse from 'url-parse';
import { parse as qsParse, stringify as qsStringify } from './query-string';

export const urlParse = (s: string) => {
  const r = parse(s, {}, qsParse);
  const oldToString = r.toString.bind(r);

  r.toString = () => oldToString(qsStringify);

  return r;
};
