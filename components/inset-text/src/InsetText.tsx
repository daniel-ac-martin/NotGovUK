import { FC, HTMLAttributes, ReactNode, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';

import '../assets/InsetText.scss';

export type InsetTextProps = StandardProps & HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode
};

export const InsetText: FC<InsetTextProps> = ({
  children,
  classBlock,
  classModifiers,
  className,
  ...attrs
}) => {
  const classes = classBuilder('govuk-inset-text', classBlock, classModifiers, className);

  return (
    <div {...attrs} className={classes()}>
      {children}
    </div>
  );
};

export default InsetText;
