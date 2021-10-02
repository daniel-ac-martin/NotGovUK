import { FC, HTMLAttributes, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';

import '../assets/VisuallyHidden.scss';

export type VisuallyHiddenProps = StandardProps & HTMLAttributes<HTMLSpanElement>;

export const VisuallyHidden: FC<VisuallyHiddenProps> = ({ children, classBlock, classModifiers, className, ...attrs }) => {
  const classes = classBuilder('govuk-visually-hidden', classBlock, classModifiers, className);

  return (
    <span {...attrs} className={classes()}>{children}</span>
  );
};

VisuallyHidden.displayName = 'VisuallyHidden';

export default VisuallyHidden;
