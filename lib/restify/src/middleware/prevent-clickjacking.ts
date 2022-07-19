import { contentSecurityPolicy } from './content-security-policy.js';

import type { Middleware } from './common.js';

export const preventClickjacking: Middleware = (req, res, next) => {
  res.header('X-Frame-Options', 'DENY'); // Consider: SAMEORIGIN

  contentSecurityPolicy(req, res, next);
};

export default preventClickjacking;
