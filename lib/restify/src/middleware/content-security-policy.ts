import { Middleware } from './common';


export type Source = '\'none\'' | '\'self\'' | string
export type Sources = Source | Source[]

export type CSPOptions = {
  frameAncestors?: Sources
};

export const none: Source = "'none'";
export const self: Source = "'self'";
export const unsafeEval: Source = "'unsafe-eval'";
export const unsafeInline: Source = "'unsafe-inline'";

const id = <T>(v: T): T => v;

const csp = ({
  frameAncestors: _frameAncestors
}: CSPOptions, nonce: string): Record<string, Sources> => {
  const frameAncestors = (
    Array.isArray(_frameAncestors)
      ? _frameAncestors
      : [_frameAncestors]
  ).filter(id) as Source[];

  return {
    // Fetch directives
    'default-src': none, // Secure by default!
    'connect-src': self, // Only connect (with JS etc) to ourselves
    'font-src': self, // Only load our own fonts
    'frame-src': self, // Only load our own pages in frames (although we currently block this anyway)
    'img-src': self, // Only load our own images (no hot-linking) - I think this is a good idea as it helps prevent tracking
    'manifest-src': self, // Only load our own manifests
    'media-src': self, // Only load our own media
    'script-src': (
      process.env.NODE_ENV === 'development'
        ? [ self, `'nonce-${nonce}'`, unsafeEval ] // Looser policy for HMR in local-dev environment
        : [ self, `'nonce-${nonce}'` ] // Only load our own (java)scripts
    ),
    'style-src': [ self, unsafeInline ], // Only load our own CSS, but allow inline styles
    // Navigation directives
    'form-action': self, // Form submissions must come back to us
    'frame-ancestors': frameAncestors.length && frameAncestors || none // Pages cannot be shown inside frames at all. Consider: self
  };
};

const isDefined = (v: any): boolean => (
  v !== undefined && v !== ''
);

const policy = (options: CSPOptions, nonce: string) => {
  const cspObj = csp(options, nonce);

  return Object.keys(cspObj)
    .map(directive => {
      const _valueArr = cspObj[directive];
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
};

export const contentSecurityPolicy = (options: CSPOptions = {}): Middleware => (_req, res, next) => {
  // Generate nonce
  const nonce = Math.random()
    .toString(36)
    .slice(2);

  // Set nonce on response object
  res.nonce = nonce;

  // Set CSP
  res.header('Content-Security-Policy', policy(options, nonce));

  next();
};

export default contentSecurityPolicy;
