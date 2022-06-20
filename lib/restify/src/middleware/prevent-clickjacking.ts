import { contentSecurityPolicy } from './middleware/content-security-policy';

export const preventClickjacking = (req, res, next) => {
  res.header('X-Frame-Options', 'DENY'); // Consider: SAMEORIGIN

  contentSecurityPolicy(req, res, next);
};

export default preventClickjacking;
