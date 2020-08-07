'use strict';

const shell = require('shelljs');
const { resolve } = require('path');
const skelPackage = require('./skel/package.base.json');

const cmd = (command, options) => {
  const r = shell.exec(command, { ...options, async: false });

  if (r.code !== 0) {
    process.exit(r.code);
  }

  return r;
};

const rel = (path) => resolve(process.cwd(), path);

const shortToLong = (name) => (
  name
    .split(/[\-_]+/)
    .map(str => str.charAt(0).toUpperCase() + str.slice(1))
    .join(' ')
);

const defaultKeywords = [
];

module.exports = plop => {
  plop.load('@not-govuk/plop-pack');

  console.log('Welcome.');
  console.log('This project initialiser builds on top of the standard `npm init`, which writes to the current working directory; you should do the following before running this tool:');
  console.log('  1. create a new directory for your project');
  console.log('  2. set up version control, including hooking up to GitHub or similar service');
  console.log('');

  // Allow standard `npm init` to do its magic (so we can then build on top)
  console.log('Creating temporary package.json with `npm init`...');
  cmd('npm init -y', { silent: true });
  shell.mv('package.json', 'default.package.json');
  console.log('... Done.');

  // Parse in the output
  const npmDefaults = require(rel('./default.package.json'));
  const defaults = {
    ...skelPackage,
    ...npmDefaults,
    scripts: { ...skelPackage.scripts, ...npmDefaults.scripts }
  };

  // Clean up
  console.log('Cleaning up temporary package.json...');
  shell.rm('default.package.json');
  console.log('... Done.');

  console.log('');

  const patchWorkspacePackages = file => ({
    type: 'modify',
    path: rel(file),
    pattern: /"@(not-govuk)\/([^"]+)": "workspace:(.+)"/g,
    template: '"@$1/$2": "$3"'
  });

  plop.setGenerator('project', {
    description: 'Project',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Short name (e.g. "my-project"):',
        default: defaults.name || undefined
      },
      {
        type: 'input',
        name: 'fullName',
        message: 'Full name (e.g. "My project"):',
        default: shortToLong(defaults.name) || undefined
      },
      {
        type: 'input',
        name: 'version',
        message: 'Version:',
        default: defaults.version || undefined
      },
      {
        type: 'input',
        name: 'description',
        message: 'Description:',
        default: defaults.description || undefined
      },
      {
        type: 'input',
        name: 'keywords',
        message: 'Keywords:',
        default: [ ...defaultKeywords, ...defaults.keywords ].join(', ') || undefined
      },
      {
        type: 'input',
        name: 'license',
        message: 'License:',
        default: defaults.license || undefined
      },
    ],
    actions: [
      {
        type: 'copy',
        destination: rel('./.github/'),
        source: 'skel/.github/'
      },
      {
        type: 'copy',
        destination: rel('./.gitignore'),
        source: 'skel/gitignore'
      },
      {
        type: 'copy',
        destination: rel('./.jest/'),
        source: 'skel/.jest/'
      },
      {
        type: 'copy',
        destination: rel('./jest.config.base.js'),
        source: 'skel/jest.config.base.js'
      },
      {
        type: 'copy',
        destination: rel('./jest.config.js'),
        source: 'skel/jest.config.js'
      },
      {
        type: 'write',
        path: rel('./package.json'),
        content: answers => ({
          ...defaults,
          name: answers.name,
          version: answers.version,
          description: answers.description,
          keywords: ( answers.keywords && answers.keywords.split(/,\s*/) ) || undefined,
          license: answers.license
        })
      },
      {
        type: 'copy',
        destination: rel('./plopfile.js'),
        source: 'skel/plopfile.js/'
      },
      {
        type: 'copy',
        destination: rel('./pnpm-workspace.yaml'),
        source: 'skel/pnpm-workspace.yaml'
      },
      {
        type: 'add',
        path: rel('./README.md'),
        templateFile: 'skel/README.md.hbs'
      },
      {
        type: 'copy',
        destination: rel('./skel/'),
        source: 'skel/skel/'
      },
      {
        type: 'shell',
        command: 'mv -f skel/app/gitignore skel/app/.gitignore'
      },
      {
        type: 'shell',
        command: 'mv -f skel/component/gitignore skel/component/.gitignore'
      },
      {
        type: 'shell',
        command: 'mv -f skel/lib/gitignore skel/lib/.gitignore'
      },
      {
        type: 'copy',
        destination: rel('./.storybook/'),
        source: 'skel/.storybook/'
      },
      {
        type: 'copy',
        destination: rel('./tsconfig.build.json'),
        source: 'skel/tsconfig.build.json'
      },
      {
        type: 'copy',
        destination: rel('./tsconfig.json'),
        source: 'skel/tsconfig.json'
      },
      {
        type: 'copy',
        destination: rel('./tsconfig.nodejs.json'),
        source: 'skel/tsconfig.nodejs.json'
      },
      {
        type: 'copy',
        destination: rel('./tsconfig.webpack.json'),
        source: 'skel/tsconfig.webpack.json'
      },
      patchWorkspacePackages('./package.json'),
      patchWorkspacePackages('./skel/app/package.json.hbs'),
      patchWorkspacePackages('./skel/component/package.json.hbs'),
      patchWorkspacePackages('./skel/lib/package.json.hbs'),
      {
        type: 'shell',
        command: 'echo \'Downloading dependencies (this may take a while!)...\''
      },
      {
        type: 'shell',
        command: 'pnpm install'
      },
      {
        type: 'shell',
        command: 'echo \'Setting up documentation website...\''
      },
      {
        type: 'shell',
        command: 'npm run create:app docs \'Documentation website\''
      },
      {
        type: 'copy',
        destination: rel('./apps/docs/src/common/pages/components.tsx'),
        source: 'skel/apps/docs/src/common/pages/components.tsx'
      },
      {
        type: 'copy',
        destination: rel('./apps/docs/src/common/pages/index.tsx'),
        source: 'skel/apps/docs/src/common/pages/index.tsx',
        overwrite: true
      },
      {
        type: 'copy',
        destination: rel('./apps/docs/src/mdx.d.ts'),
        source: 'skel/apps/docs/src/mdx.d.ts'
      },
      {
        type: 'copy',
        destination: rel('./apps/docs/webpack.config.js'),
        source: 'skel/apps/docs/webpack.config.js',
        overwrite: true
      },
      {
        type: 'copy',
        destination: rel('./apps/docs/webpack.config.server.js'),
        source: 'skel/apps/docs/webpack.config.server.js',
        overwrite: true
      },
      {
        type: 'shell',
        command: 'pnpm install'
      },
      {
        type: 'shell',
        command: 'mkdir -p components'
      },
      {
        type: 'shell',
        command: 'echo \'Done. (You may want to commit this with `git commit -am \'Initial commit\'`.)\''
      }
    ]
  });
};
