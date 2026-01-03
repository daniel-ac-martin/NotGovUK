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
      path: 'apps/{{{name}}}/package.json',
      templateFile: rel('package.json.hbs')
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
      destination: 'apps/{{{name}}}/aws-lambda-entry.js',
      source: rel('aws-lambda-entry.js')
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
      type: 'copy',
      destination: 'apps/{{{name}}}/jest.config.cjs',
      source: rel('jest.config.cjs')
    },
    {
      type: 'symlink',
      path: 'apps/{{{name}}}/lambda.Dockerfile',
      target: rel('lambda.Dockerfile')
    },
    {
      type: 'add',
      path: 'apps/{{{name}}}/Makefile',
      templateFile: rel('Makefile.hbs')
    },
    {
      type: 'copy',
      destination: 'apps/{{{name}}}/plopfile.mjs',
      source: rel('plopfile.mjs')
    },
    {
      type: 'copy',
      destination: 'apps/{{{name}}}/public/',
      source: rel('public/')
    },
    {
      type: 'copy',
      destination: 'apps/{{{name}}}/react-router.config.ts',
      source: rel('react-router.config.ts')
    },
    {
      type: 'add',
      path: 'apps/{{{name}}}/README.md',
      templateFile: rel('README.md.hbs')
    },
    {
      type: 'copy',
      destination: 'apps/{{{name}}}/src/',
      source: rel('src/')
    },
    {
      type: 'add',
      path: 'apps/{{{name}}}/src/app/config.ts',
      templateFile: rel('src/app/config.ts.hbs')
    },
    {
      type: 'symlink',
      path: 'apps/{{{name}}}/test.Dockerfile',
      target: rel('test.Dockerfile')
    },
    {
      type: 'copy',
      destination: 'apps/{{{name}}}/tsconfig.json',
      source: rel('tsconfig.json')
    },
    {
      type: 'copy',
      destination: 'apps/{{{name}}}/vite.config.server.ts',
      source: rel('vite.config.server.ts')
    },
    {
      type: 'copy',
      destination: 'apps/{{{name}}}/vite.config.ts',
      source: rel('vite.config.ts')
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
