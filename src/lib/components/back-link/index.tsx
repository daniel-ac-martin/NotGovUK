import * as React from 'react';

interface IBackLink {
  /** The location to link to */
  href?: string,
  /** The text of the item */
  text?: string,
  /** The title of the link */
  title?: string
};

export const BackLink: React.SFC<IBackLink> = props => {
  const href = props.href || 'javascript: history.back()';

  return (
    <a href={href} className="back" title={props.title}>{props.text}</a>
  );
};

BackLink.defaultProps = {
  href: null,
  text: 'Back',
  title: null
};

export default BackLink;
