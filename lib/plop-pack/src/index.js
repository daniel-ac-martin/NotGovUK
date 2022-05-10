import plopActionCopy from './actions/copy.js';
import plopActionMerge from './actions/merge.js';
import plopActionMessage from './actions/message.js';
import plopActionShell from './actions/shell.js';
import plopActionSymlink from './actions/symlink.js';
import plopActionWrite from './actions/write.js';

import plopGeneratorApplication from './generators/app.js';
import plopGeneratorComponent from './generators/component.js';
import plopGeneratorLibrary from './generators/lib.js';

import handlebarsHelperEq from './helpers/eq.js';
import handlebarsHelperMdTitle from './helpers/md-title.js';

const plopFunction = async (plop) => {
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
  plop.setHelper('mdTitle', handlebarsHelperMdTitle);

  plop.setDefaultInclude({ actionTypes: true, generators: true, helpers: true });
};

export default plopFunction;

export { actionPaths } from './action-paths.js';
export { extendGenerator } from './extend-generator.js';
export { relativePath } from './relative-path.js';
export { runPlop } from './run-plop.js';
