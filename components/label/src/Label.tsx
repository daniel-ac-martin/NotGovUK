import { FC, LabelHTMLAttributes, ReactNode, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@react-foundry/component-helpers';

import '../assets/Label.scss';

export type LabelProps = StandardProps & LabelHTMLAttributes<HTMLLabelElement> & {
  children?: ReactNode
  hidden?: boolean
  /** Whether the label is the page heading (wraps it in an h1) */
  isPageHeading?: boolean
};

export const Label: FC<LabelProps> = ({
  children,
  classBlock,
  classModifiers: _classModifiers = [],
  className,
  hidden = false,
  isPageHeading = false,
  ...attrs
}) => {
  const classModifiers = [
    hidden ? 'hidden' : undefined,
    ...(Array.isArray(_classModifiers) ? _classModifiers : [_classModifiers])
  ];
  const classes = classBuilder('govuk-label', classBlock, classModifiers, className);
  const label = (
    <label {...attrs} className={classes()} aria-hidden={hidden}>{children}</label>
  );

  return (
    isPageHeading
    ? <h1 className="govuk-label-wrapper">{label}</h1>
    : label
  );
};

Label.displayName = 'Label';

export default Label;
