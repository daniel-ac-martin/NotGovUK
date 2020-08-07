'use strict';

const shell = require('shelljs');

const exec = (command, options) => {
  const r = shell.exec(command, { ...options, async: false });

  if (r.code !== 0) {
    process.exit(r.code);
  }

  return r;
};

const plopActionShell = (answers, config, plop) => {
  const command = plop.renderString(config.command, answers);

  exec(command);

  return command;
};

module.exports = plopActionShell;
