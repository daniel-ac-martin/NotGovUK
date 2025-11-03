import type { Maybe } from './common';

import { id, isDefined } from './common';

export type Source = '\'none\'' | '\'self\'' | string
export type Sources = Source | Source[]

export type CSPOptions = {
  dev?: boolean
  formAction?: Sources
  frameAncestors?: Sources
  nonce?: string
};

export type CSPResult = {
  policy: string
  frameOptions?: string
};

type CSP = (x: CSPOptions) => CSPResult;

type CSPDirectiveFragment = Maybe<string>;
type CSPDirective = CSPDirectiveFragment | CSPDirectiveFragment[];
type CSPObject = Record<string, CSPDirective>

export const none: Source = "'none'";
export const self: Source = "'self'";
export const unsafeEval: Source = "'unsafe-eval'";
export const unsafeInline: Source = "'unsafe-inline'";

export const contentSecurityPolicy: CSP = ({
  dev = process.env.NODE_ENV === 'development',
  formAction: _formAction,
  frameAncestors: _frameAncestors,
  nonce: _nonce
}) => {
  const formAction = (
    Array.isArray(_formAction)
      ? _formAction
      : [_formAction]
  ).filter(id) as Source[];
  const frameAncestors = (
    Array.isArray(_frameAncestors)
      ? _frameAncestors
      : [_frameAncestors]
  ).filter(id) as Source[];
  const frameAncestor = (
    frameAncestors.length > 1
      ? 'multiple'
      : frameAncestors[0]
  ) || none;
  const frameOptions = (
    frameAncestor === 'multiple'
      ? undefined
      : (
        frameAncestor === self
          ? 'SAMEORIGIN'
          : 'DENY'
      )
  );
  const nonce = _nonce && `'nonce-${_nonce}'`;
  const cspObject: CSPObject = {
    // Fetch directives
    'default-src': none, // Secure by default!
    'connect-src': (
      dev
        ? [ self, 'ws://localhost:*' ] // Looser policy for HMR in local-dev environment
        : self // Only connect (with JS etc) to ourselves
    ),
    'font-src': self, // Only load our own fonts
    'frame-src': self, // Only load our own pages in frames (although we currently block this anyway)
    'img-src': self, // Only load our own images (no hot-linking) - I think this is a good idea as it helps prevent tracking
    'manifest-src': self, // Only load our own manifests
    'media-src': self, // Only load our own media
    'script-src': [ self, nonce ],
    'style-src': [ self, unsafeInline ], // Only load our own CSS, but allow inline styles
    // Navigation directives
    'form-action': formAction.length && formAction || self, // Form submissions must come back to us
    'frame-ancestors': frameAncestors.length && frameAncestors || none // Pages cannot be shown inside frames at all. Consider: self
  };
  const cspString = (
    Object.keys(cspObject)
      .map(directive => {
        const _valueArr = cspObject[directive];
        const valueArr = (
          Array.isArray(_valueArr)
            ? _valueArr
            : [ _valueArr ]
        );
        const values = (
          valueArr
            .filter(isDefined)
            .map(v => `${v}`)
            .join(' ')
        );

        return (
          values === ''
            ? undefined
            : `${directive} ${values}`
        );
      } )
      .filter(isDefined)
      .join('; ')
  );

  return {
    policy: cspString,
    frameOptions
  };
};
