import fs from 'fs-extra';
import path from 'node:path';
import actionPaths from '../action-paths.js';

const plopActionCopy = (answers, config, plop) => {
  const paths = actionPaths(answers, config, plop);
  const dest = paths.dest(config.destination);
  const source = paths.source(config.source);
  const prettyDest = paths.pretty(dest);
  const exclude = config.exclude || ['hbs'];

  return (
    fs.copy(source, dest, {
      overwrite: config.overwrite || false,
      errorOnExist: true,
      dereference: true,
      filter: config.filter || (
        (src) => exclude
          .map(v => !src.endsWith(`.${v}`))
          .reduce((acc, cur) => cur && acc, true)
      )
    })
      .then(() => `${prettyDest}`)
  );
};

export default plopActionCopy;
