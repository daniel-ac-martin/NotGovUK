export type StandardProps = {
  /** 'id' attribute to place on the base HTML element */
  id?: string
  /** Block name override in BEM style classes applied to all elements */
  classBlock?: string
  /** BEM style modifiers to apply to the base HTML element */
  classModifiers?: string[]
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

export const classBuilder = (blockDefault: string, blockOverride?: string, blockModifiers?: string[], extra?: string) => {
  const block = blockOverride || blockDefault;

  return (element?: string, elementModifiers?: string[]) => (
    element
      ? concatClasses(`${block}__${element}`, elementModifiers?.filter(id).map(modifier => `${block}__${element}--${modifier}`))
      : concatClasses(`${block}`, blockModifiers?.filter(id).map(modifier => `${block}--${modifier}`), extra)
  );
};
