'use strict';

const minimist = require('minimist');
const { Plop, run } = require('plop');

const args = process.argv.slice(2);
const argv = minimist(args);

const runPlop = (plopfilePath) => Plop.launch(
  {
    cwd: argv.cwd,
    configPath: plopfilePath,
    require: argv.require,
    completion: argv.completion
  },
  env => {
    const options = {
      ...env,
      dest: process.cwd()
    };

    return run(options, undefined, true);
  }
);

module.exports = runPlop;
