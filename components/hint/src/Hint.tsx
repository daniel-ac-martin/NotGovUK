import { FC, HTMLAttributes, ReactNode, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';

import '../assets/Hint.scss';

export type HintProps = StandardProps & HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode
  hidden?: boolean
};

export const Hint: FC<HintProps> = ({
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
  const classes = classBuilder('govuk-hint', classBlock, classModifiers, className);

  return (
    <div {...attrs} className={classes()} aria-hidden={hidden}>{children}</div>
  );
};

Hint.displayName = 'Hint';

export default Hint;
