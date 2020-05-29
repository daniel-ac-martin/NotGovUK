'use strict';

const fs = require('fs-extra');
const path = require('path');

const plopActionCopy = (answers, config, plop) => {
  const dest = plop.renderString(config.destination, answers);

  return (
    fs.copy(config.source, dest, {
      overwrite: false,
      errorOnExist: true,
      dereference: true
    })
      .then(() => `${dest}`)
  );
};

module.exports = plopActionCopy;
