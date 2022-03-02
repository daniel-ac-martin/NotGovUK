'use strict';

const rel = require('../rel-to-skel')('component');

module.exports = {
  description: 'Component',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Name (e.g. "My component"):'
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
      path: 'components/{{{dashCase name}}}/jest.config.js',
      templateFile: rel('jest.config.js.hbs')
    },
    {
      type: 'add',
      path: 'components/{{{dashCase name}}}/package.json',
      templateFile: rel('package.json.hbs')
    },
    {
      type: 'add',
      path: 'components/{{{dashCase name}}}/README.md',
      templateFile: rel('README.md.hbs')
    },
    {
      type: 'copy',
      destination: 'components/{{{dashCase name}}}/.gitignore',
      source: rel('gitignore')
    },
    {
      type: 'symlink',
      path: 'components/{{{dashCase name}}}/tsconfig.json',
      target: rel('tsconfig.json')
    },
    {
      type: 'add',
      path: 'components/{{{dashCase name}}}/assets/{{{properCase name}}}.scss',
      templateFile: rel('assets/Component.scss.hbs')
    },
    {
      type: 'add',
      path: 'components/{{{dashCase name}}}/spec/{{{properCase name}}}.stories.mdx',
      templateFile: rel('spec/Component.stories.mdx.hbs')
    },
    {
      type: 'add',
      path: 'components/{{{dashCase name}}}/spec/{{{properCase name}}}.ts',
      templateFile: rel('spec/Component.ts.hbs')
    },
    {
      type: 'add',
      path: 'components/{{{dashCase name}}}/src/{{{properCase name}}}.tsx',
      templateFile: rel('src/Component.tsx.hbs')
    }
  ]
};
