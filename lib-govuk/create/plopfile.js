'use strict';

const { resolve } = require('path');
const { extendGenerator } = require('@not-govuk/plop-pack-internal');

const tarball = resolve(__dirname, 'dist', 'skel.tar');

module.exports = plop => {
  const parent = '@not-govuk/create-internal';

  plop.load('@not-govuk/plop-pack-internal', undefined, { actionTypes: true, generators: false, helpers: true, partials: false });

  plop.setGenerator(
    'project',
    extendGenerator(plop, parent, 'project', {
      prompts: [
      ],
      actions: [
        {
          type: 'shell',
          command: `tar -xv --strip-components=1 -f '${tarball}'`
        },
        {
          type: 'merge',
          path: 'package.json',
          templateFile: 'dist/package.base.json'
        },
        {
          type: 'merge',
          path: 'apps/docs/package.json',
          templateFile: 'dist/package.app.json'
        },
        {
          type: 'message',
          content: 'Done. (You may want to commit this with `git commit -am \'Initial commit\'`.)'
        }
      ]
    }, -1, 1)
  );
};
