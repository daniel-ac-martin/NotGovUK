import fs from 'fs-extra';
import actionPaths from '../action-paths.js';

const plopActionWrite = (answers, config, plop) => {
  const paths = actionPaths(answers, config, plop);
  const file = paths.dest(config.path);
  const prettyFile = paths.pretty(file);
  const data = config.content(answers);
  const writeFileSync = (
    typeof data === 'string'
      ? fs.writeFileSync
      : fs.writeJsonSync
  );

  writeFileSync(file, data, { spaces: 2 });

  return prettyFile;
};

export default plopActionWrite;
