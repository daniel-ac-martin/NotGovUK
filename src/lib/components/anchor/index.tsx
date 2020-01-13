import * as React from 'react';
import { Link } from 'react-router-dom';

interface IAnchor {
  /** Extra CSS classes to be applied */
  className?: string,
  /** Location to link to */
  href: string,
  /** HTML id */
  id?: string,
  /** Text of the item */
  text?: string,
  /** Title of the link */
  title?: string
};

export const Anchor: React.SFC<IAnchor> = props => (
  <Link
    className={props.className}
    id={props.id}
    title={props.title}
    to={props.href}
  >
    {props.children}
  </Link>
);

Anchor.defaultProps = {
  className: null,
  id: null,
  text: 'Back',
  title: null
};

export default Anchor;
