import { FC, HTMLAttributes, ReactNode, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';

import '../assets/Hint.scss';

export type HintProps = StandardProps & HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode
};

export const Hint: FC<HintProps> = ({ children, classBlock, classModifiers, className, ...attrs }) => {
  const classes = classBuilder('govuk-hint', classBlock, classModifiers, className);

  return (
    <div {...attrs} className={classes()}>{children}</div>
  );
};

Hint.displayName = 'Hint';

export default Hint;
