'use strict';

const rel = require('../rel-to-skel')('app');

module.exports = {
  description: 'Application',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Name (e.g. "my-app"):'
    },
    {
      type: 'input',
      name: 'title',
      message: 'Title (e.g. "My app"):'
    },
    {
      type: 'input',
      name: 'description',
      message: 'Description:'
    }
  ],
  actions: [
    {
      type: 'add',
      path: 'apps/{{{name}}}/Makefile',
      templateFile: rel('Makefile.hbs')
    },
    {
      type: 'add',
      path: 'apps/{{{name}}}/package.json',
      templateFile: rel('package.json.hbs')
    },
    {
      type: 'add',
      path: 'apps/{{{name}}}/README.md',
      templateFile: rel('README.md.hbs')
    },
    {
      type: 'add',
      path: 'apps/{{{name}}}/serverless.yml',
      templateFile: rel('serverless.yml.hbs')
    },
    {
      type: 'symlink',
      path: 'apps/{{{name}}}/.dockerignore',
      target: rel('.dockerignore')
    },
    {
      type: 'symlink',
      path: 'apps/{{{name}}}/.gitignore',
      target: rel('gitignore')
    },
    {
      type: 'symlink',
      path: 'apps/{{{name}}}/Dockerfile',
      target: rel('Dockerfile')
    },
    {
      type: 'symlink',
      path: 'apps/{{{name}}}/tsconfig.json',
      target: rel('tsconfig.json')
    },
    {
      type: 'copy',
      destination: 'apps/{{{name}}}/plopfile.js',
      source: rel('plopfile.js')
    },
    {
      type: 'copy',
      destination: 'apps/{{{name}}}/src/',
      source: rel('src/')
    },
    {
      type: 'add',
      path: 'apps/{{{name}}}/src/common/config.ts',
      templateFile: rel('src/common/config.ts.hbs')
    },
    {
      type: 'copy',
      destination: 'apps/{{{name}}}/webpack.config.js',
      source: rel('webpack.config.js')
    }
  ]
};
