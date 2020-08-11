'use strict';

const fs = require('fs-extra');
const path = require('path');
const actionPaths = require('../action-paths');

const plopActionCopy = (answers, config, plop) => {
  const paths = actionPaths(answers, config, plop);
  const dest = paths.dest(config.destination);
  const source = paths.source(config.source);
  const prettyDest = paths.pretty(dest);

  return (
    fs.copy(source, dest, {
      overwrite: config.overwrite || false,
      errorOnExist: true,
      dereference: true
    })
      .then(() => `${prettyDest}`)
  );
};

module.exports = plopActionCopy;
