import { Location } from 'history';
import { AnchorHTMLAttributes, FC, createElement as h } from 'react';
import { match as Match } from 'react-router';
import { NavHashLink } from 'react-router-hash-link';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';
import { urlParse, useIsMounted, useLocation } from '@not-govuk/route-utils';

import '../assets/Anchor.scss';

export type AnchorProps = StandardProps & AnchorHTMLAttributes<HTMLAnchorElement> & {
  /** Whether to force the link to be treated as external (useful for internal links that are NOT handled by the application) */
  forceExternal?: boolean
};

const supportedProtocols = [
  'http:',
  'https:'
];

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

export const isActive = (query: object) => (match: Match<object>, location: Location): boolean => (
  match && includes(
    urlParse(location.search).query,
    query
  )
);

export const Anchor: FC<AnchorProps> = ({
  children,
  classBlock,
  classModifiers,
  className,
  forceExternal = false,
  href,
  ...attrs
}) => {
  const defaultClassBlock = 'penultimate-anchor';
  const activeClassName = `${classBlock || defaultClassBlock}--active`;
  const classes = classBuilder(defaultClassBlock, classBlock, classModifiers, className);
  const isMounted = useIsMounted();
  const url = urlParse(href);
  const unsupported = url.protocol !== '' && !supportedProtocols.includes(url.protocol);
  const noPath = url.pathname === '';
  const noSearch = url.search === '';
  const noHash = url.hash === '';
  const hashLink = noPath && noSearch;
  const current = useLocation();
  const location = {
    pathname: (
      noPath
      ? current.pathname
      : url.pathname
    ),
    search: (
      hashLink
      ? current.search
      : url.search
    ),
    hash: (
      noHash
      ? '#'
      : url.hash
    )
  };
  const basicAnchor = (
    forceExternal ||
    unsupported ||
    url.host ||
    !isMounted && hashLink ||
    hashLink && url.hash === '#'
  );

  return (
    basicAnchor
    ? (
      <a
        {...attrs as any} // Temp-fix for type package clash!
        className={classes()}
        href={href}
      >
        {children}
      </a>
    )
    : (
      <NavHashLink
        {...attrs}
        activeClassName={activeClassName}
        className={classes()}
        exact
        isActive={isActive(url.query)}
        to={location}
      >
        {children}
      </NavHashLink>
    )
  );
};

Anchor.displayName = 'A';

export default Anchor;
export const A: FC<AnchorProps> = Anchor;
