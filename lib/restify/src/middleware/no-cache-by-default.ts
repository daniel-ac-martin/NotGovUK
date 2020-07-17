function writeHead() {
  if (!this.getHeader('Cache-Control')) {
    this.cache('no-cache, no-store');
  }

  return this._restifyWriteHead.apply(this, arguments);
}

export const noCacheByDefault = (req, res, next) => {
  res._restifyWriteHead = res.writeHead;
  res.writeHead = writeHead;

  next();
};

export default noCacheByDefault;
