'use strict';

const plopPackInternal = require.resolve('@not-govuk/plop-pack-internal');

const longToShort = (name) => (
  name
    .toLowerCase()
    .replace(/\s+/, '-')
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

  plop.setDefaultInclude({ actionTypes: true, generators: true, helpers: true });
};

module.exports = plopFunction;
