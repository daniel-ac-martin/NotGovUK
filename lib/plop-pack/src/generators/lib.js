import relToSkel from '../rel-to-skel.js';

const rel = relToSkel('lib');

export const generator = {
  description: 'Library',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Name (e.g. "my-library"):'
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
      path: 'apps/{{{name}}}/jest.config.js',
      templateFile: rel('jest.config.js.hbs')
    },
    {
      type: 'add',
      path: 'lib/{{{name}}}/package.json',
      templateFile: rel('package.json.hbs')
    },
    {
      type: 'add',
      path: 'lib/{{{name}}}/README.md',
      templateFile: rel('README.md.hbs')
    },
    {
      type: 'copy',
      destination: 'lib/{{{name}}}/.gitignore',
      source: rel('gitignore')
    },
    {
      type: 'symlink',
      path: 'lib/{{{name}}}/tsconfig.json',
      target: rel('tsconfig.json')
    },
    {
      type: 'addMany',
      destination: 'lib/{{{name}}}/src/',
      base: rel('src/'),
      templateFiles: rel('src/**.hbs')
    }
  ]
};

export default generator;
