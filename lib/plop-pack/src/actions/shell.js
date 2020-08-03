'use strict';

const { execFileSync } = require('child_process');

const cmd = (file, args) => execFileSync(file, args, { stdio: 'inherit' });

const plopActionShell = (answers, config, plop) => {
  const [ file, ...args ] = (
    plop
      .renderString(config.command, answers)
      .split(/\s+/) // FIXME: This probably needs to be properly parsed
  );

  try {
    cmd(file, [ ...args ]);
  } catch (err) {
    process.exit(err.status || 1);
  }

  return true;
};

module.exports = plopActionShell;
