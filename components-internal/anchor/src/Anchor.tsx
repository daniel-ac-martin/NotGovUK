'use client';

import { AnchorHTMLAttributes, FC, Suspense, ReactNode, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';
import { Link, needSuspense, urlParse, useIsMounted, useLocation, useActive } from '@not-govuk/route-utils';

import '../assets/Anchor.scss';

export type AnchorProps = StandardProps & AnchorHTMLAttributes<HTMLAnchorElement> & {
  children?: ReactNode
  /** Whether to force the link to be treated as external (useful for internal links that are NOT handled by the application) */
  forceExternal?: boolean
};

const supportedProtocols = [
  'http:',
  'https:'
];

const AnchorInner: FC<AnchorProps> = ({
  children,
  classBlock,
  classModifiers: _classModifiers = [],
  className,
  forceExternal = false,
  href,
  ...attrs
}) => {
  const isMounted = useIsMounted();
  const active = useActive()(href || '');
  const current = useLocation();
  const classModifiers = [
    active ? 'active' : '',
    ...(Array.isArray(_classModifiers) ? _classModifiers : [_classModifiers])
  ];
  const classes = classBuilder('penultimate-anchor', classBlock, classModifiers, className);
  const url = urlParse(href || '');
  const unsupported = url.protocol !== '' && !supportedProtocols.includes(url.protocol);
  const noPath = url.pathname === '';
  const noSearch = url.search === '';
  const noHash = url.hash === '';
  const hashLink = noPath && noSearch;
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
          {...attrs}
          className={classes()}
          href={href}
        >
          {children}
        </a>
      )
      : (
        <Link
          {...attrs}
          aria-current={active ? 'page' : undefined}
          className={classes()}
          to={location}
        >
          {children}
        </Link>
      )
  );
};

export const Anchor: FC<AnchorProps> = ({
  children,
  classBlock,
  classModifiers,
  className,
  forceExternal,
  href,
  ...attrs
}) => {
  const classes = classBuilder('penultimate-anchor', classBlock, classModifiers, className);
  const props = {
    ...attrs,
    classBlock,
    classModifiers,
    className,
    forceExternal,
    href
  };
  const content = (
    <AnchorInner {...props}>
      {children}
    </AnchorInner>
  );

  return (
    !needSuspense ? content : (
      <Suspense fallback={
        <a
          {...attrs}
          className={classes()}
          href={href}
        >
          {children}
        </a>
      }>
        {content}
      </Suspense>
    )
  );
};

Anchor.displayName = 'A';

export default Anchor;
export const A: FC<AnchorProps> = Anchor;
