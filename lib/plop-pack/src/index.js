'use strict';

const plopActionCopy = require('./actions/copy');
const plopActionMessage = require('./actions/message');
const plopActionShell = require('./actions/shell');
const plopActionSymlink = require('./actions/symlink');
const plopActionWrite = require('./actions/write');

const plopFunction = plop => {
  plop.setActionType('copy', plopActionCopy);
  plop.setActionType('message', plopActionMessage);
  plop.setActionType('shell', plopActionShell);
  plop.setActionType('symlink', plopActionSymlink);
  plop.setActionType('write', plopActionWrite);

  plop.setDefaultInclude({ actionTypes: true });
};

plopFunction.actionPaths = require('./action-paths');
plopFunction.relativePath = require('./relative-path');

module.exports = plopFunction;
