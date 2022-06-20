const csp = {
  'frame-ancestors': 'none' // Consider: 'self'
};

const policy = Object.keys(csp)
  .map(directive => `${directive} '${csp[directive]}'`)
  .join('; ');

export const contentSecurityPolicy = (req, res, next) => {
  res.header('Content-Security-Policy', policy);

  next();
};

export default contentSecurityPolicy;
