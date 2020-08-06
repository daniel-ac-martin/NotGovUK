'use strict';

const fs = require('fs-extra');

const plopActionWrite = (answers, config, plop) => {
  const file = plop.renderString(config.path, answers);
  const data = config.content(answers);
  const writeFileSync = (
    typeof data === 'string'
      ? fs.writeFileSync
      : fs.writeJsonSync
  );

  writeFileSync(file, data, { spaces: 2 });

  return file;
};

module.exports = plopActionWrite;
