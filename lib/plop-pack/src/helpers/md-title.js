const mdTitle = function(options) {
  const t = options.fn(this);
  return `${t}\n${t.replace(/./g, '=')}`;
};

export default mdTitle;
