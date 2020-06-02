export const liveness = (req, res, next) => {
  res.contentType = undefined;
  res.send('OK');
};

export default liveness;
