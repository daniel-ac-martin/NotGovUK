'use strict';

const plopActionCopy = require('./actions/copy');
const plopActionShell = require('./actions/shell');
const plopActionSymlink = require('./actions/symlink');

module.exports = plop => {
  plop.setActionType('copy', plopActionCopy);
  plop.setActionType('shell', plopActionShell);
  plop.setActionType('symlink', plopActionSymlink);

  plop.setDefaultInclude({ actionTypes: true });
};
