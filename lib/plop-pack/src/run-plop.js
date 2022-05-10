import minimist from 'minimist';
import { Plop, run } from 'plop';

const args = process.argv.slice(2);
const argv = minimist(args);

export const runPlop = (plopfilePath) => Plop.prepare(
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

    return Plop.execute(options, run);
  }
);

export default runPlop;
