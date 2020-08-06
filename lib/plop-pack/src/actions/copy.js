'use strict';

const fs = require('fs-extra');
const path = require('path');

const plopActionCopy = (answers, config, plop) => {
  const dest = plop.renderString(config.destination, answers);
  const source = path.resolve(plop.getPlopfilePath(), config.source);

  return (
    fs.copy(source, dest, {
      overwrite: false,
      errorOnExist: true,
      dereference: true
    })
      .then(() => `${dest}`)
  );
};

module.exports = plopActionCopy;
