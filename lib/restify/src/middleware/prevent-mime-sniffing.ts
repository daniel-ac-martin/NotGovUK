export const preventMimeSniffing = (req, res, next) => {
  res.header('X-Content-Type-Options', 'nosniff');

  next();
};

export default preventMimeSniffing;
