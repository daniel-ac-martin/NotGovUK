import { FC, ReactNode, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';

import '../assets/Tag.scss';

export type TagProps = StandardProps & {
  children?: ReactNode
  /** Text to be displayed within the tag */
  text?: string
};

export const Tag: FC<TagProps> = ({ children, classBlock, classModifiers, className, text, ...attrs }) => {
  const classes = classBuilder('govuk-tag', classBlock, classModifiers, className);

  return (
    <strong {...attrs} className={classes()}>{text || children}</strong>
  );
};

export default Tag;
