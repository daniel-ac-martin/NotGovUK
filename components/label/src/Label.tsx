import { FC, LabelHTMLAttributes, ReactNode, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';

import '../assets/Label.scss';

export type LabelProps = StandardProps & LabelHTMLAttributes<HTMLLabelElement> & {
  children?: ReactNode
};

export const Label: FC<LabelProps> = ({ children, classBlock, classModifiers, className, ...attrs }) => {
  const classes = classBuilder('govuk-label', classBlock, classModifiers, className);

  return (
    <label {...attrs} className={classes()}>{children}</label>
  );
};

Label.displayName = 'Label';

export default Label;
