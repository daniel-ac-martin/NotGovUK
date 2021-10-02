import { FC, HTMLAttributes, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';

import '../assets/ButtonGroup.scss';

export type ButtonGroupProps = StandardProps & HTMLAttributes<HTMLDivElement> & {
};

export const ButtonGroup: FC<ButtonGroupProps> = ({
  children,
  classBlock,
  classModifiers,
  className,
  ...attrs
}) => {
  const classes = classBuilder('govuk-button-group', classBlock, classModifiers, className);

  return (
    <div {...attrs} className={classes()}>
      {children}
    </div>
  );
};

ButtonGroup.displayName = 'ButtonGroup';

export default ButtonGroup;
