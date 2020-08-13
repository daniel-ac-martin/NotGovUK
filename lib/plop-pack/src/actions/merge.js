'use strict';

const _ = require('lodash');
const fs = require('fs-extra');
const actionPaths = require('../action-paths');

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

module.exports = plopActionMerge;
