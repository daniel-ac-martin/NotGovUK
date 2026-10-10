import { FC, HTMLAttributes, ReactNode, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@react-foundry/component-helpers';

export type CheckboxesDividerProps = StandardProps & HTMLAttributes<HTMLDivElement> & {
  /** The text of the divider */
  children?: ReactNode
};

export const CheckboxesDivider: FC<CheckboxesDividerProps> = ({
  children,
  classBlock,
  classModifiers,
  className,
  ...attrs
}) => {
  const classes = classBuilder('govuk-checkboxes', classBlock);

  return (
    <div {...attrs} className={classes('divider', classModifiers, className)}>
      {children}
    </div>
  );
};

CheckboxesDivider.displayName = 'CheckboxesDivider';

export default CheckboxesDivider;
