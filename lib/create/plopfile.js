'use strict';

const shell = require('shelljs');
const { resolve } = require('path');
const skelPackage = require('./dist/package.base.json');
const plopPackInternal = require.resolve('@not-govuk/plop-pack-internal');

const cmd = (command, options) => {
  const r = shell.exec(command, { ...options, async: false });

  if (r.code !== 0) {
    process.exit(r.code);
  }

  return r;
};

const shortToLong = (name) => (
  name
    .split(/[\-_]+/)
    .map(str => str.charAt(0).toUpperCase() + str.slice(1))
    .join(' ')
);

const defaultKeywords = [
];

const tarball = resolve(__dirname, 'dist', 'skel.tar');
const tarballPrototype = resolve(__dirname, 'dist', 'skel-prototype.tar');

let defaults = undefined;

const init = () => {
  console.log('Welcome.');
  console.log('This generator / initialiser builds on top of the standard `npm init`, which writes to the current working directory; you should do the following before running this tool:');
  console.log('  1. create a new directory for your project');
  console.log('  2. set up version control, including hooking up to GitHub or similar service');
  console.log('');

  // Allow standard `npm init` to do its magic (so we can then build on top)
  console.log('Creating temporary package.json with `npm init`...');
  cmd('npm init -y', { silent: true });
  shell.mv('package.json', 'default.package.json');
  console.log('... Done.');

  // Parse in the output
  const npmDefaults = require(resolve(process.cwd(), './default.package.json'));
  defaults = {
    ...skelPackage,
    ...npmDefaults,
    scripts: { ...skelPackage.scripts, ...npmDefaults.scripts }
  };

  // Clean up
  console.log('Cleaning up temporary package.json...');
  shell.rm('default.package.json');
  console.log('... Done.');

  console.log('');
};

module.exports = plop => {
  plop.load(plopPackInternal, undefined, { actionTypes: true, generators: false, helpers: true, partials: false });

  if (!defaults) {
    init();
  }

  const patchPackage = file => [
    {
      type: 'modify',
      path: file,
      pattern: /"name": "@.*\/(.+)"/,
      template: '"name": "@{{{name}}}/$1"'
    },
    {
      type: 'modify',
      path: file,
      pattern: /"version": ".*"/,
      template: '"version": "{{{version}}}"'
    },
    {
      type: 'modify',
      path: file,
      pattern: /"license": ".*"/,
      template: '"license": "{{{license}}}"'
    },
    {
      type: 'modify',
      path: file,
      pattern: /"author": ".*"/,
      template: `"author": "${defaults.author}"`
    }
  ];

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
      }
    ],
    actions: [
      {
        type: 'shell',
        command: `tar -xv --strip-components=1 -f '${tarball}'`
      },
      ...patchPackage('apps/docs/package.json'),
      {
        type: 'write',
        path: 'package.json',
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
        type: 'add',
        path: 'README.md',
        templateFile: 'skel/project/README.md.hbs'
      },
      {
        type: 'message',
        content: 'Done. (You can install dependencies with `pnpm i` and you may then want to commit with `git add . && git commit -m \'Initial commit\'`.)'
      }
    ]
  });

  plop.setGenerator('prototype', {
    description: 'Prototype (stand-alone application)',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Short name (e.g. "my-prototype"):',
        default: defaults.name || undefined
      },
      {
        type: 'input',
        name: 'fullName',
        message: 'Full name (e.g. "My prototype"):',
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
        name: 'license',
        message: 'License:',
        default: defaults.license || undefined
      }
    ],
    actions: [
      {
        type: 'shell',
        command: `tar -xv --strip-components=1 -f '${tarballPrototype}'`
      },
      {
        type: 'merge',
        path: 'package.json',
        templateFile: 'skel/prototype/package.json.hbs'
      },
      {
        type: 'add',
        path: 'README.md',
        templateFile: 'skel/prototype/README.md.hbs'
      },
      {
        type: 'message',
        content: 'Done. (You may want to commit this with `git add . && git commit -m \'Initial commit\'`.)'
      }
    ]
  });
};
