'use strict';

const shell = require('shelljs');

const cmd = (command, options) => {
  const r = shell.exec(command, { ...options, async: false });

  if (r.code !== 0) {
    process.exit(r.code);
  }

  return r;
};

const plopActionShell = (answers, config, plop) => {
  cmd(plop.renderString(config.command, answers));
  return '';
};

module.exports = plopActionShell;
