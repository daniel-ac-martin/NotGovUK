'use strict';

const title = function(options) {
  const t = options.fn(this);
  return `${t}\n${t.replace(/./g, '=')}`;
}

module.exports = title;
