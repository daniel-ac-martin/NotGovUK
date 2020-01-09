import * as React from 'react';
import { className } from '../../helpers';

interface ISkipLink {
  /** Extra CSS classes to be applied */
  className?: string,
  /** The location to link to */
  href: string,
  /** HTML id */
  id?: string,
  /** The text of the item */
  text?: string
};

export const SkipLink: React.SFC<ISkipLink> = props => (
  <a id={props.id} href={props.href} className={className('skip-link', props.className)}>{props.text}</a>
);

SkipLink.defaultProps = {
  className: null,
  id: null,
  text: 'Skip to main content'
};

export default SkipLink;
