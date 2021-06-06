'use strict';

const plopActionCopy = require('./actions/copy');
const plopActionMerge = require('./actions/merge');
const plopActionMessage = require('./actions/message');
const plopActionShell = require('./actions/shell');
const plopActionSymlink = require('./actions/symlink');
const plopActionWrite = require('./actions/write');

const plopGeneratorApplication = require('./generators/app');
const plopGeneratorComponent = require('./generators/component');
const plopGeneratorLibrary = require('./generators/lib');

const handlebarsHelperEq = require('./helpers/eq');
const handlebarsHelperTitle = require('./helpers/title');

const plopFunction = plop => {
  plop.setActionType('copy', plopActionCopy);
  plop.setActionType('merge', plopActionMerge);
  plop.setActionType('message', plopActionMessage);
  plop.setActionType('shell', plopActionShell);
  plop.setActionType('symlink', plopActionSymlink);
  plop.setActionType('write', plopActionWrite);

  plop.setGenerator('app', plopGeneratorApplication);
  plop.setGenerator('component', plopGeneratorComponent);
  plop.setGenerator('lib', plopGeneratorLibrary);

  plop.setHelper('eq', handlebarsHelperEq);
  plop.setHelper('title', handlebarsHelperTitle);

  plop.setDefaultInclude({ actionTypes: true, generators: true, helpers: true });
};

plopFunction.actionPaths = require('./action-paths');
plopFunction.extendGenerator = require('./extend-generator');
plopFunction.relativePath = require('./relative-path');
plopFunction.runPlop = require('./run-plop');

module.exports = plopFunction;
