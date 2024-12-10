import { Sources as CSPSources, contentSecurityPolicy, none as cspNone, self as cspSelf } from './content-security-policy';

import type { Middleware } from './common';

export type PreventClickJackingOptions = {
  formAction?: CSPSources // This should be moved out, once we move out the CSP
  frameAncestors?: CSPSources
};

const id = <T>(v: T): T => v;

export const preventClickjacking = ({
  formAction: _formAction = cspSelf,
  frameAncestors: _frameAncestors = cspNone // Consider: cspSelf
}: PreventClickJackingOptions): Middleware => {
  const formAction = (
    Array.isArray(_formAction)
      ? _formAction
      : [_formAction]
  ).filter(id);
  const frameAncestors = (
    Array.isArray(_frameAncestors)
      ? _frameAncestors
      : [_frameAncestors]
  ).filter(id);
  const frameAncestor = (
    frameAncestors.length > 1
      ? 'multiple'
      : frameAncestors[0]
  ) || cspNone;
  const frameOptions = (
    frameAncestor === 'multiple'
      ? null
      : (
        frameAncestor === cspSelf
          ? 'SAMEORIGIN'
          : 'DENY'
      )
  );
  const cspMiddleware = contentSecurityPolicy({
    formAction: formAction,
    frameAncestors: frameAncestors
  });

  return (req, res, next) => {
    if (frameOptions !== null) {
      res.header('X-Frame-Options', frameOptions);
    }

    cspMiddleware(req, res, next);
  };
};

export default preventClickjacking;
export {
  cspNone,
  cspSelf
};
export type {
  CSPSources
};
