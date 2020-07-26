'use strict';

const plopActionSymlink = require('./actions/symlink');
const plopActionCopy = require('./actions/copy');

module.exports = plop => {
  plop.setActionType('symlink', plopActionSymlink);
  plop.setActionType('copy', plopActionCopy);

  plop.setDefaultInclude({ actionTypes: true });
};
