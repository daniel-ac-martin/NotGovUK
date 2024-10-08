import { HTMLProps, FC, ReactNode, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';

import '../assets/SkipLink.scss';

export type SkipLinkProps = StandardProps & Omit<HTMLProps<HTMLAnchorElement>, 'href'> & {
  children?: ReactNode
  /** ID of the element to skip to */
  for: string
};

export const SkipLink: FC<SkipLinkProps> = ({
  children = 'Skip to main content',
  classBlock,
  classModifiers,
  className,
  for: forProp,
  ...attrs
}) => {
  const classes = classBuilder('govuk-skip-link', classBlock, classModifiers, className);
  const href = `#${forProp}`;

  return (
    <a {...attrs} className={classes()} href={href} data-module="govuk-skip-link">{children}</a>
  );
};

export default SkipLink;
