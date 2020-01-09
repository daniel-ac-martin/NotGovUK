import * as React from 'react';
import { className } from '../../helpers';

interface IBackLink {
  /** Extra CSS classes to be applied */
  className?: string,
  /** The location to link to */
  href?: string,
  /** HTML id */
  id?: string,
  /** The text of the item */
  text?: string,
  /** The title of the link */
  title?: string
};

export const BackLink: React.SFC<IBackLink> = props => {
  const href = props.href || 'javascript: history.back()';
  const classes = className('back', props.className);

  return (
    <a id={props.id} href={href} className={classes} title={props.title}>{props.text}</a>
  );
};

BackLink.defaultProps = {
  className: null,
  href: null,
  id: null,
  text: 'Back',
  title: null
};

export default BackLink;
