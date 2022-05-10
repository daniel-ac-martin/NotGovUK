// Some of the code here is based on code from 'node-plop' which is
// licensed under the MIT license and is copyright 2016 Andrew Worcester.

import path from 'node:path';

const normalisePath = filePath => (
	!path.sep || path.sep === '\\'
    ? filePath.replace(/\\/g, '/')
    : filePath
);

export const actionPaths = (data, cfg, plop) => {
  const destBasePath = plop.getDestBasePath();
  const plopfilePath = plop.getPlopfilePath();
  const fullData = { ...cfg.data, ...data };

  const dest = filePath => {
    const normalPath = normalisePath(filePath) || '';

    return path.resolve(
      destBasePath,
      plop.renderString(normalPath, fullData)
    );
  };

  const pretty = filePath => (
    '/' + path.relative(destBasePath, filePath)
  );

  const source = filePath => path.resolve(plopfilePath, filePath);

  return {
    dest,
    pretty,
    source
  };
};

export default actionPaths;
