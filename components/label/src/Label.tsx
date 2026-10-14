import { ElementType, FC, LabelHTMLAttributes, ReactNode, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@react-foundry/component-helpers';

import '../assets/Label.scss';

// The sizes GOV.UK gives headings on a page that is not long form content
// See: https://design-system.service.gov.uk/styles/headings/
const headingModifiers: Record<string, string> = { h1: 'l', h2: 'm', h3: 's', h4: 's', h5: 's', h6: 's' };

export type LabelProps = StandardProps & LabelHTMLAttributes<HTMLLabelElement> & {
  children?: ReactNode
  /** Component to wrap the label in, making it a heading */
  heading?: ElementType
  hidden?: boolean
};

export const Label: FC<LabelProps> = ({
  children,
  classBlock,
  classModifiers: _classModifiers,
  className,
  heading: Heading,
  hidden = false,
  ...attrs
}) => {
  const modifiers = _classModifiers ?? (
    typeof Heading === 'string' ? headingModifiers[Heading] : undefined
  );
  const classModifiers = [
    hidden ? 'hidden' : undefined,
    ...(Array.isArray(modifiers) ? modifiers : [modifiers])
  ];
  const classes = classBuilder('govuk-label', classBlock, classModifiers, className);
  const label = (
    <label {...attrs} className={classes()} aria-hidden={hidden}>{children}</label>
  );

  return (
    Heading
    ? <Heading className="govuk-label-wrapper">{label}</Heading>
    : label
  );
};

Label.displayName = 'Label';

export default Label;
