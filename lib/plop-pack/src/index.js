'use strict';

const plopActionCopy = require('./actions/copy');
const plopActionShell = require('./actions/shell');
const plopActionSymlink = require('./actions/symlink');
const plopActionWrite = require('./actions/write');

module.exports = plop => {
  plop.setActionType('copy', plopActionCopy);
  plop.setActionType('shell', plopActionShell);
  plop.setActionType('symlink', plopActionSymlink);
  plop.setActionType('write', plopActionWrite);

  plop.setDefaultInclude({ actionTypes: true });
};
