'use strict';

const plopActionCopy = require('./actions/copy');
const plopActionShell = require('./actions/shell');
const plopActionSymlink = require('./actions/symlink');
const plopActionWrite = require('./actions/write');

const plopFunction = plop => {
  plop.setActionType('copy', plopActionCopy);
  plop.setActionType('shell', plopActionShell);
  plop.setActionType('symlink', plopActionSymlink);
  plop.setActionType('write', plopActionWrite);

  plop.setDefaultInclude({ actionTypes: true });
};

plopFunction.relativePath = require('./relative-path');

module.exports = plopFunction;
