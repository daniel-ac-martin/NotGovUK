import { FC, HTMLAttributes, ReactNode, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';
import { VisuallyHidden } from '@not-govuk/visually-hidden';

import '../assets/WarningText.scss';

export type WarningTextProps = StandardProps & HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode
  /** Hidden text to be read out by a screen-reader prior to the warning */
  iconFallbackText?: string
};

export const WarningText: FC<WarningTextProps> = ({
  children,
  classBlock,
  classModifiers,
  className,
  iconFallbackText = 'Warning',
  ...attrs
}) => {
  const classes = classBuilder('govuk-warning-text', classBlock, classModifiers, className);

  return (
    <div {...attrs} className={classes()}>
      <span className={classes('icon')} aria-hidden="true">!</span>
      <strong className={classes('text')}>
        <VisuallyHidden>{iconFallbackText}</VisuallyHidden>
        {children}
      </strong>
    </div>
  );
};

export default WarningText;
