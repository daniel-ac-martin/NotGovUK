export const className = (...classes) => (
  classes
    .flat(Infinity)
    .filter(e => e)
    .join(' ') || undefined);
