function writeHead() {
  if (!this.getHeader('Cache-Control')) {
    this.cache('no-cache, no-store, must-revalidate, private');
    this.header('Pragma', 'no-cache');
    this.header('Expires', '0');
  }

  return this._restifyWriteHead.apply(this, arguments);
}

export const noCacheByDefault = (req, res, next) => {
  res._restifyWriteHead = res.writeHead;
  res.writeHead = writeHead;

  next();
};

export default noCacheByDefault;
