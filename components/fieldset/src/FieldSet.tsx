import { FC, FieldsetHTMLAttributes, ReactNode, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@react-foundry/component-helpers';

import '../assets/FieldSet.scss';

export type LegendSize = 's' | 'm' | 'l' | 'xl';

export type FieldSetProps = StandardProps & FieldsetHTMLAttributes<HTMLFieldSetElement> & {
  children?: ReactNode
  /** Whether the legend is the page heading (wraps it in an h1) */
  isPageHeading?: boolean
  legend: ReactNode
  /** Size of the legend text */
  legendSize?: LegendSize
};

export const FieldSet: FC<FieldSetProps> = ({
  children,
  classBlock,
  classModifiers,
  className,
  isPageHeading = false,
  legend,
  legendSize,
  ...attrs
}) => {
  const classes = classBuilder('govuk-fieldset', classBlock, classModifiers, className);

  return (
    <fieldset {...attrs} className={classes()}>
      <legend className={classes('legend', legendSize)}>
        { isPageHeading ? <h1 className={classes('heading')}>{legend}</h1> : legend }
      </legend>
      {children}
    </fieldset>
  );
};

FieldSet.displayName = 'FieldSet';

export default FieldSet;
