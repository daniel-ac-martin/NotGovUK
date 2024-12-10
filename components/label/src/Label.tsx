import { FC, LabelHTMLAttributes, ReactNode, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';

import '../assets/Label.scss';

export type LabelProps = StandardProps & LabelHTMLAttributes<HTMLLabelElement> & {
  children?: ReactNode
  hidden?: boolean
};

export const Label: FC<LabelProps> = ({
  children,
  classBlock,
  classModifiers: _classModifiers = [],
  className,
  hidden = false,
  ...attrs
}) => {
  const classModifiers = [
    hidden ? 'hidden' : undefined,
    ...(Array.isArray(_classModifiers) ? _classModifiers : [_classModifiers])
  ];
  const classes = classBuilder('govuk-label', classBlock, classModifiers, className);

  return (
    <label {...attrs} className={classes()} aria-hidden={hidden}>{children}</label>
  );
};

Label.displayName = 'Label';

export default Label;
