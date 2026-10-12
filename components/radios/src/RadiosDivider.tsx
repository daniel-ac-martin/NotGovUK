import { FC, HTMLAttributes, ReactNode, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@react-foundry/component-helpers';

export type RadiosDividerProps = StandardProps & HTMLAttributes<HTMLDivElement> & {
  /** The text of the divider */
  children?: ReactNode
};

export const RadiosDivider: FC<RadiosDividerProps> = ({
  children,
  classBlock,
  classModifiers,
  className,
  ...attrs
}) => {
  const classes = classBuilder('govuk-radios', classBlock);

  return (
    <div {...attrs} className={classes('divider', classModifiers, className)}>
      {children}
    </div>
  );
};

RadiosDivider.displayName = 'RadiosDivider';

export default RadiosDivider;
