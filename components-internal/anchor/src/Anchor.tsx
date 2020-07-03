import { FC, createElement as h } from 'react';
import { NavLink } from 'react-router-dom';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';
import { urlParse } from '@not-govuk/route-utils';

import '../assets/Anchor.scss';

export type AnchorProps = StandardProps & {
  /** Whether the link should be draggable */
  draggable?: boolean,
  /** Whether to force the link to be treated as external (useful for internal links that are NOT handled by the application) */
  forceExternal?: boolean,
  /** Location to link to */
  href: string,
  /** Relation of the link */
  rel?: string,
  /** Role of the link */
  role?: string,
  /** Title of the link */
  title?: string
};

export const Anchor: FC<AnchorProps> = ({ children, classBlock, classModifiers, className, forceExternal = false, href, ...attrs }) => {
  const classes = classBuilder('penultimate-anchor', classBlock, classModifiers, className);
  const url = urlParse(href);

  return (forceExternal || url.host) ? (
    <a
      {...attrs}
      className={classes()}
      href={href}
    >
      {children}
    </a>
  ) : (
    <NavLink
      {...attrs}
      className={classes()}
      to={href}
      exact
    >
      {children}
    </NavLink>
  );
};

Anchor.displayName = 'A';

export default Anchor;
export const A = Anchor;
