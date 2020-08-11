'use strict';

const path = require('path');
const shell = require('shelljs');
const actionPaths = require('../action-paths');

const symlinkOrCopy = (source, dest, topDir) => new Promise(
  (resolve, reject) => {
    const to = path.relative(path.dirname(dest), source);
    const shouldCopy = to.includes('node_modules') || path.relative(topDir, source).includes('..');
    const resultType = (
      shouldCopy
        ? 'file'
        : 'symlink'
    );
    const r = (
      shouldCopy
        ? shell.cp('-rnL', source, dest)
        : shell.ln('-s', to, dest)
    );

    return (
      r.code === 0
        ? resolve(resultType)
        : reject(r.stderr)
    );
  }
);

const plopActionSymlink = (answers, config, plop) => {
  const paths = actionPaths(answers, config, plop);
  const dest = paths.dest(config.path);
  const source = paths.source(config.target);
  const prettyDest = paths.pretty(dest);
  const prettySource = paths.pretty(source);

  return symlinkOrCopy(source, dest, plop.getDestBasePath()).then(t => (
    t === 'symlink'
      ? `${prettyDest} -> ${prettySource}`
      : prettyDest
  ));
};

module.exports = plopActionSymlink;
