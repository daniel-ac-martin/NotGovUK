import { FC, ReactNode, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';

import '../assets/WarningText.scss';

export type WarningTextProps = StandardProps & {
  children?: ReactNode
  /** Hidden text to be read out by a screen-reader prior to the warning */
  assistiveText?: string
};

export const WarningText: FC<WarningTextProps> = ({
  children,
  classBlock,
  classModifiers,
  className,
  assistiveText = 'Warning',
  ...attrs
}) => {
  const classes = classBuilder('govuk-warning-text', classBlock, classModifiers, className);

  return (
    <div {...attrs} className={classes()}>
      <span className={classes('icon')} aria-hidden="true">!</span>
      <strong className={classes('text')}>
        <span className={classes('assistive')}>{assistiveText}</span>
        {children}
      </strong>
    </div>
  );
};

export default WarningText;
