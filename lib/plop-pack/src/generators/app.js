import relToSkel from '../rel-to-skel.js';

const rel = relToSkel('app');

export const generator = {
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
      path: 'apps/{{{name}}}/aws.serverless.yml',
      templateFile: rel('aws.serverless.yml.hbs')
    },
    {
      type: 'add',
      path: 'apps/{{{name}}}/jest.config.js',
      templateFile: rel('jest.config.js.hbs')
    },
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
      type: 'symlink',
      path: 'apps/{{{name}}}/.dockerignore',
      target: rel('.dockerignore')
    },
    {
      type: 'copy',
      destination: 'apps/{{{name}}}/.gitignore',
      source: rel('gitignore')
    },
    {
      type: 'copy',
      destination: 'apps/{{{name}}}/cypress.config.mjs',
      source: rel('cypress.config.mjs')
    },
    {
      type: 'symlink',
      path: 'apps/{{{name}}}/Dockerfile',
      target: rel('Dockerfile')
    },
    {
      type: 'copy',
      destination: 'apps/{{{name}}}/feat/',
      source: rel('feat/')
    },
    {
      type: 'symlink',
      path: 'apps/{{{name}}}/test.Dockerfile',
      target: rel('test.Dockerfile')
    },
    {
      type: 'symlink',
      path: 'apps/{{{name}}}/tsconfig.json',
      target: rel('tsconfig.json')
    },
    {
      type: 'copy',
      destination: 'apps/{{{name}}}/plopfile.mjs',
      source: rel('plopfile.mjs')
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
      destination: 'apps/{{{name}}}/webpack.config.mjs',
      source: rel('webpack.config.mjs')
    },
    {
      type: 'copy',
      destination: 'apps/{{{name}}}/webpack.config.d.mts',
      source: rel('webpack.config.d.mts')
    },
    {
      type: 'modify',
      path: '.github/workflows/change-assurance.yml',
      pattern: /app: \[(.+?)( ?)\]/g,
      template: 'app: [$1, \'{{{name}}}\'$2]'
    },
    {
      type: 'modify',
      path: '.github/workflows/change-assurance.yml',
      pattern: /app: \[\]/g,
      template: 'app: [ \'{{{name}}}\' ]'
    }
  ]
};

export default generator;
