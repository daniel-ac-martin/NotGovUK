export const preventClickjacking = (req, res, next) => {
  res.header('X-Frame-Options', 'DENY');
  res.header('Content-Security-Policy', 'frame-ancestors \'none\'');

  next();
};

export default preventClickjacking;
