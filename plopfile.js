'use strict';

const plopActionSymlink = require('./.plop/actions/symlink');
const plopActionCopy = require('./.plop/actions/copy');

module.exports = plop => {
  plop.setActionType('symlink', plopActionSymlink);
  plop.setActionType('copy', plopActionCopy);

  plop.setGenerator('app', {
    description: 'Application',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Name (e.g. "my-app"):'
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
        templateFile: 'skel/app/package.json.hbs'
      },
      {
        type: 'add',
        path: 'apps/{{{name}}}/README.md',
        templateFile: 'skel/app/README.md.hbs'
      },
      {
        type: 'add',
        path: 'apps/{{{name}}}/serverless.yml',
        templateFile: 'skel/app/serverless.yml.hbs'
      },
      {
        type: 'symlink',
        path: 'apps/{{{name}}}/.dockerignore',
        target: 'skel/app/.dockerignore'
      },
      {
        type: 'symlink',
        path: 'apps/{{{name}}}/.gitignore',
        target: 'skel/app/.gitignore'
      },
      {
        type: 'symlink',
        path: 'apps/{{{name}}}/tsconfig.json',
        target: 'skel/app/tsconfig.json'
      },
      {
        type: 'copy',
        destination: 'apps/{{{name}}}/src/',
        source: 'skel/app/src/'
      },
      {
        type: 'copy',
        destination: 'apps/{{{name}}}/webpack.config.js',
        source: 'skel/app/webpack.config.js'
      },
      {
        type: 'copy',
        destination: 'apps/{{{name}}}/webpack.config.server.js',
        source: 'skel/app/webpack.config.server.js'
      }
    ]
  });

  plop.setGenerator('lib', {
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
        path: 'lib/{{{name}}}/package.json',
        templateFile: 'skel/lib/package.json.hbs'
      },
      {
        type: 'add',
        path: 'lib/{{{name}}}/README.md',
        templateFile: 'skel/lib/README.md.hbs'
      },
      {
        type: 'symlink',
        path: 'lib/{{{name}}}/.gitignore',
        target: 'skel/lib/.gitignore'
      },
      {
        type: 'symlink',
        path: 'lib/{{{name}}}/tsconfig.json',
        target: 'skel/lib/tsconfig.json'
      },
      {
        type: 'addMany',
        destination: 'lib/{{{name}}}/src/',
        base: 'skel/lib/src/',
        templateFiles: 'skel/lib/src/**.hbs'
      }
    ]
  });

  plop.setGenerator('component', {
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
        path: 'components/{{{dashCase name}}}/package.json',
        templateFile: 'skel/component/package.json.hbs'
      },
      {
        type: 'add',
        path: 'components/{{{dashCase name}}}/README.md',
        templateFile: 'skel/component/README.md.hbs'
      },
      {
        type: 'symlink',
        path: 'components/{{{dashCase name}}}/.gitignore',
        target: 'skel/component/.gitignore'
      },
      {
        type: 'symlink',
        path: 'components/{{{dashCase name}}}/tsconfig.json',
        target: 'skel/component/tsconfig.json'
      },
      {
        type: 'add',
        path: 'components/{{{dashCase name}}}/assets/{{{properCase name}}}.scss',
        templateFile: 'skel/component/assets/Component.scss.hbs'
      },
      {
        type: 'add',
        path: 'components/{{{dashCase name}}}/spec/{{{properCase name}}}.stories.mdx',
        templateFile: 'skel/component/spec/Component.stories.mdx.hbs'
      },
      {
        type: 'add',
        path: 'components/{{{dashCase name}}}/src/{{{properCase name}}}.tsx',
        templateFile: 'skel/component/src/Component.tsx.hbs'
      }
    ]
  });
};
