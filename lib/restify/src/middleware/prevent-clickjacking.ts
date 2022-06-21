import { contentSecurityPolicy } from './content-security-policy';

import type { Middleware } from './common';

export const preventClickjacking: Middleware = (req, res, next) => {
  res.header('X-Frame-Options', 'DENY'); // Consider: SAMEORIGIN

  contentSecurityPolicy(req, res, next);
};

export default preventClickjacking;
