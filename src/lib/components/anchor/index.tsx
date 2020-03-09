import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { urlParse } from '../../request/';

interface IAnchor {
  /** Extra CSS classes to be applied */
  className?: string,
  /** Whether to force the link to be treated as external (useful for internal links that are NOT handled by the application) */
  forceExternal?: boolean,
  /** Location to link to */
  href: string,
  /** HTML id */
  id?: string,
  /** Title of the link */
  title?: string
};

export const Anchor: React.SFC<IAnchor> = props => {
  const url = urlParse(props.href);

  return (props.forceExternal || url.host) ? (
    <a
      className={props.className}
      href={props.href}
      id={props.id}
      title={props.title}
    >
      {props.children}
    </a>
  ) : (
    <NavLink
      className={props.className}
      id={props.id}
      title={props.title}
      to={props.href}
    >
      {props.children}
    </NavLink>
  );
};

Anchor.defaultProps = {
  className: null,
  forceExternal: false,
  id: null,
  title: null
};

Anchor.displayName = 'A';

export default Anchor;
