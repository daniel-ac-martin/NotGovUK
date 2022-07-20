export type StandardProps = {
  /** 'id' attribute to place on the base HTML element */
  id?: string
  /** Block name override in BEM style classes applied to all elements */
  classBlock?: string
  /** BEM style modifiers to apply to the base HTML element */
  classModifiers?: string | string[]
  /** Extra classes to apply to the base HTML element */
  className?: string
};

export type ClassBuilder = (element?: string, elementModifiers?: string | string[], extra2?: string) => string;

// Define a pointless component to coax react-docgen-typescript-loader
const StandardComponent = (props: StandardProps) => null;

export const id = <T>(v: T): T => v;

interface ArrayTree<T> extends Array<ArrayTreeNode<T>> {}
type ArrayTreeNode<T> = T | ArrayTree<T>;

const concatClasses = (...classes: ArrayTreeNode<string>[]): string => (
  // @ts-ignore
  classes
    .flat(Infinity)
    .filter(id)
    .join(' ') || undefined
);

const toArray = <T>(v?: T | T[]): T[] => (
  Array.isArray(v)
    ? v
    : v && [v]
);

export const classBuilder = (blockDefault: string, blockOverride?: string, blockModifiers?: string | string[], extra?: string): ClassBuilder => {
  const block = blockOverride || blockDefault;
  const bModifiers = toArray(blockModifiers);

  return (element?: string, elementModifiers?: string | string[], extra2?: string) => {
    const eModifiers = toArray(elementModifiers);

    return (
      element
        ? concatClasses(`${block}__${element}`, eModifiers?.filter(id).map(modifier => `${block}__${element}--${modifier}`), extra2)
        : concatClasses(`${block}`, bModifiers?.filter(id).map(modifier => `${block}--${modifier}`), extra)
    );
  };
};
