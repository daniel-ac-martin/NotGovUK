import _ from 'lodash';
import fs from 'fs-extra';
import actionPaths from '../action-paths.js';

const plopActionMerge = (answers, config, plop) => new Promise(
  (resolve, reject) => {
    const paths = actionPaths(answers, config, plop);
    const file = paths.dest(config.path);
    const prettyFile = paths.pretty(file);
    const templateFile = paths.source(config.templateFile);
    const readOptions = { encoding: 'utf8' };
    const original = fs.readJsonSync(file, readOptions);
    const update = JSON.parse(
      plop.renderString(
        fs.readFileSync(templateFile, readOptions),
        { ...config.data, ...answers }
      )
    );
    const data = _.merge({}, original, update);

    fs.writeJsonSync(file, data, { spaces: 2 });
    resolve(prettyFile);
  }
);

export default plopActionMerge;
