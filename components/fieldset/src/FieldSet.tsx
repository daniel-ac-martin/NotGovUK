import { ElementType, FC, FieldsetHTMLAttributes, ReactNode, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@react-foundry/component-helpers';

import '../assets/FieldSet.scss';

// The sizes GOV.UK gives headings on a page that is not long form content
// See: https://design-system.service.gov.uk/styles/headings/
const headingModifiers: Record<string, string> = { h1: 'l', h2: 'm', h3: 's', h4: 's', h5: 's', h6: 's' };

export type FieldSetProps = StandardProps & FieldsetHTMLAttributes<HTMLFieldSetElement> & {
  children?: ReactNode
  legend: ReactNode
  /** BEM style modifiers to apply to the legend */
  legendClassModifiers?: StandardProps['classModifiers']
  /** Component to wrap the legend in, making it a heading */
  legendHeading?: ElementType
};

export const FieldSet: FC<FieldSetProps> = ({
  children,
  classBlock,
  classModifiers,
  className,
  legend,
  legendClassModifiers,
  legendHeading: Heading,
  ...attrs
}) => {
  const classes = classBuilder('govuk-fieldset', classBlock, classModifiers, className);
  const modifiers = legendClassModifiers ?? (
    typeof Heading === 'string' ? headingModifiers[Heading] : undefined
  );

  return (
    <fieldset {...attrs} className={classes()}>
      <legend className={classes('legend', modifiers)}>
        { Heading ? <Heading className={classes('heading')}>{legend}</Heading> : legend }
      </legend>
      {children}
    </fieldset>
  );
};

FieldSet.displayName = 'FieldSet';

export default FieldSet;
