export const id = <T>(v: T): T => v;

export const className = (...classes) => (
  classes
    .flat(Infinity)
    .filter(id)
    .join(' ') || undefined
);

export const bem = (baseClass, ...modifiers) => (
  className(baseClass, modifiers.filter(id).map(e => `${baseClass}--${e}`))
);
