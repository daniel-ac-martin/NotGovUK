'use strict';

const { resolve } = require('path');

const plopPackInternal = require.resolve('@not-govuk/plop-pack-internal');

const id = v => v;

const longToShort = (name) => (
  name
    .toLowerCase()
    .replace(/\s+/, '-')
);

const constantCase = (str) => (
  str
    .toUpperCase()
    .replace(/[-\s]+/, '_')
);

const plopFunction = plop => {
  plop.load(plopPackInternal, undefined, { actionTypes: true, generators: false, helpers: true, partials: false });

  const notHtml = answers => answers.ext !== 'html';

  plop.setGenerator('page', {
    description: 'A new page on the website',
    prompts: [
      {
        type: 'list',
        name: 'ext',
        message: 'Type of page:',
        choices: [
          { value: 'html', name: 'HTML (simple)' },
          //{ value: 'rt', name: 'React template (experimental)' },
          { value: 'tsx', name: 'TSX (advanced)' }
        ],
        default: 1
      },
      {
        type: 'input',
        name: 'title',
        message: 'Title (e.g. "My page"):'
      },
      {
        type: 'input',
        name: 'name',
        message: 'Short name (e.g. "my-page"):',
        default: answers => longToShort(answers.title)
      },
      {
        type: 'input',
        name: 'description',
        message: 'Description:',
        when: notHtml
      },
      {
        type: 'confirm',
        name: 'query',
        message: 'Include example of accessing query parameters?:',
        default: false,
        when: notHtml
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/common/pages/{{{name}}}.{{{ext}}}',
        templateFile: '../skel/src/common/pages/page.hbs'
      },
      {
        type: 'message',
        content: '\n\nPage created at: /{{{ name }}}\nTo modify, edit: ./src/common/pages/{{{ name }}}.{{{ ext }}}\n(You may need to refresh your browser of even restart the application in order to see it.)'
      }
    ]
  });

  const pkg = require(resolve(process.cwd(), './package.json'));
  const nameArray = pkg.name.split('/');
  const standalone = nameArray.length === 1;
  const appName = nameArray.pop();
  const [ to, gitRoot, appDir, secretSuffix ] = (
    standalone
      ? [ 'to', './', './', '' ]
      : [`${appName}-to`, '../../', `./apps/${appName}/`, `_${constantCase(appName)}` ]
  );

  plop.setGenerator('deployment', {
    description: 'A new deployment pipeline',
    prompts: [
      {
        type: 'list',
        name: 'target',
        message: 'Where do you want to deploy?:',
        choices: [
          { value: 'heroku', name: 'Heroku' },
          { value: 'netlify', name: 'Netlify' }
        ]
      },
      {
        type: 'input',
        name: 'branch',
        message: 'Which branch would you like to deploy?:',
        default: 'master'
      },
      {
        type: 'input',
        name: 'usernameSecret',
        message: 'Which secret will contain your e-mail address as registered with Heroku?:',
        default: 'HEROKU_EMAIL',
        when: answers => answers.target === 'heroku'
      },
      {
        type: 'input',
        name: 'authSecret',
        message: 'Which secret will contain your auth token / API key?:',
        default: answers => (
          answers.target === 'heroku'
            ? 'HEROKU_API_KEY'
            : 'NETLIFY_AUTH_TOKEN'
        )
      },
      {
        type: 'input',
        name: 'siteSecret',
        message: 'Which secret will contain the site identifier?:',
        default: answers => (
          answers.target === 'heroku'
            ? `HEROKU_APP_NAME${secretSuffix}`
            : `NETLIFY_SITE_ID${secretSuffix}`
        )
      }
    ],
    actions: answers => {
      answers.appDir = appDir;
      answers.appName = appName;
      answers.standalone = standalone;
      const secrets = [answers.usernameSecret, answers.authSecret, answers.siteSecret].filter(id).join(', ');

      return [
        {
          type: 'append',
          path: `${gitRoot}.github/workflows/main.yml`,
          templateFile: '../skel/.github/workflows/main.deploy.yml.hbs'
        },
        `Pipeline created; once you have set-up your secrets (${secrets}) in GitHub, your changes will be automatically deployed to ${answers.target} whenever to push to the ${answers.branch}.`
      ];
    }
  });

  plop.setDefaultInclude({ actionTypes: true, generators: true, helpers: true });
};

module.exports = plopFunction;
