import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { urlParse } from '@not-govuk/route-utils';

interface IAnchor {
  /** Extra CSS classes to be applied */
  className?: string,
  /** Whether the link should be draggable */
  draggable?: boolean,
  /** Whether to force the link to be treated as external (useful for internal links that are NOT handled by the application) */
  forceExternal?: boolean,
  /** Location to link to */
  href: string,
  /** HTML id */
  id?: string,
  /** Relation of the link */
  rel?: string,
  /** Role of the link */
  role?: string,
  /** Title of the link */
  title?: string
};

export const Anchor: React.SFC<IAnchor> = props => {
  const url = urlParse(props.href);
  const processedProps = {...props};

  delete processedProps.forceExternal;

  return (props.forceExternal || url.host) ? (
    <a
      {...processedProps}
      className={props.className}
      href={props.href}
      id={props.id}
      title={props.title}
    >
      {props.children}
    </a>
  ) : (
    <NavLink
      {...processedProps}
      className={props.className}
      exact
      id={props.id}
      title={props.title}
      to={props.href}
    >
      {props.children}
    </NavLink>
  );
};

Anchor.defaultProps = {
  className: 'govuk-link',
  forceExternal: false,
  id: null,
  title: null
};

Anchor.displayName = 'A';

export default Anchor;
