import { Location } from 'history';
import { AnchorHTMLAttributes, FC, createElement as h } from 'react';
import { match as Match } from 'react-router';
import { NavLink } from 'react-router-dom';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';
import { urlParse } from '@not-govuk/route-utils';

import '../assets/Anchor.scss';

export type AnchorProps = StandardProps & AnchorHTMLAttributes<HTMLAnchorElement> & {
  /** Whether to force the link to be treated as external (useful for internal links that are NOT handled by the application) */
  forceExternal?: boolean
};

const includes = (haystack: object, needle: object): boolean => {
  const subIncludes = (haystack: any, needle: any): boolean => (
    Array.isArray(needle) ? (
      needle.length === haystack.length &&
      needle.reduce(
        (acc, cur, idx) => acc && subIncludes(haystack[idx], cur),
        true
      )
    ) : (
      typeof needle === 'object' ? (
        typeof haystack === 'object' &&
        Object.keys(needle).reduce(
          (acc, cur) => acc && subIncludes(haystack[cur], needle[cur]),
          true
        )
      ) : (
        needle === haystack
      )
    )
  );

  return subIncludes(haystack, needle);
};

export const Anchor: FC<AnchorProps> = ({ children, classBlock, classModifiers, className, forceExternal = false, href, ...attrs }) => {
  const classes = classBuilder('penultimate-anchor', classBlock, classModifiers, className);
  const url = urlParse(href);

  const isActive = (match: Match<object>, location: Location): boolean => (
    match && includes(
      urlParse(location.search).query,
      url.query
    )
  );

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
      isActive={isActive}
      exact
    >
      {children}
    </NavLink>
  );
};

Anchor.displayName = 'A';

export default Anchor;
export const A = Anchor;
