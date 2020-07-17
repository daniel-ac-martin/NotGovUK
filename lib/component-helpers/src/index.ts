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

// Define a pointless component to coax react-docgen-typescript-loader
const StandardComponent = (props: StandardProps) => null;

export const id = <T>(v: T): T => v;

interface ArrayTree<T> extends Array<ArrayTreeNode<T>> {}
type ArrayTreeNode<T> = T | ArrayTree<T>;

const concatClasses = (...classes: ArrayTreeNode<string>[]) => (
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

export const classBuilder = (blockDefault: string, blockOverride?: string, blockModifiers?: string | string[], extra?: string) => {
  const block = blockOverride || blockDefault;
  const bModifiers = toArray(blockModifiers);

  return (element?: string, elementModifiers?: string | string[]) => {
    const eModifiers = toArray(elementModifiers);

    return (
    element
      ? concatClasses(`${block}__${element}`, eModifiers?.filter(id).map(modifier => `${block}__${element}--${modifier}`))
      : concatClasses(`${block}`, bModifiers?.filter(id).map(modifier => `${block}--${modifier}`), extra)
    );
  };
};
