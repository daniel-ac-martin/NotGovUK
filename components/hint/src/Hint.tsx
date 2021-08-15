import { FC, HTMLAttributes, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';

import '../assets/Hint.scss';

export type HintProps = StandardProps & HTMLAttributes<HTMLSpanElement>;

export const Hint: FC<HintProps> = ({ children, classBlock, classModifiers, className, ...attrs }) => {
  const classes = classBuilder('govuk-hint', classBlock, classModifiers, className);

  return (
    <span {...attrs} className={classes()}>{children}</span>
  );
};

Hint.displayName = 'Hint';

export default Hint;
