'use strict';

const fs = require('fs');
const path = require('path');

const symlink = (target, path) => new Promise(
  (resolve, reject) => fs.symlink(
    target,
    path,
    err => (
      err
        ? reject(err)
        : resolve()
    )
  )
);

const plopActionSymlink = (answers, config, plop) => {
  const from = plop.renderString(config.path, answers);
  const to = path.relative(path.dirname(from), config.target);

  return (
    symlink(to, from)
      .then(() => `${from} -> ${config.target}`)
  );
};

module.exports = plopActionSymlink;
