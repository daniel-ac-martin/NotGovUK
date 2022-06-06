type Pattern = RegExp | string;

const parseBoolean = (pattern: Pattern) => (
  (s: string): boolean => !!(
    s && s.match(pattern)
  )
);

export const defaultsFalse = parseBoolean(/(yes|on|true|1)/i);
export const defaultsTrue = parseBoolean(/(no|off|false|0)/i);
