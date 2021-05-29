'use strict';

const hb = require('handlebars');
const title = require('../../src/helpers/title');
hb.registerHelper('title', title);

const data = {
  name: 'Fred',
  age: 32,
  favouriteIceCream: 'tuti fruti'
};

describe('handlebars template helper: title', () => {
  it('should be a function', () => expect(title).toBeInstanceOf(Function));
  it('should under-equals the given text', () => [
      { text: 'A', result: 'A\n=' },
      { text: 'Apples', result: 'Apples\n======' },
      { text: 'A slightly longer example', result: 'A slightly longer example\n=========================' },
      { text: '', result: '\n' }
    ].forEach(test => expect(title({ fn: () => test.text })).toEqual(test.result)));
  it('should produce a markdown title from a template and data', () => [
      { text: '{{#title}}A{{/title}}', result: 'A\n=' },
      { text: '{{#title}}Apples{{/title}}', result: 'Apples\n======' },
      { text: '{{#title}}{{favouriteIceCream}}, yum!!{{/title}}', result: 'tuti fruti, yum!!\n=================' },
      { text: '{{#title}}Profile: {{{name}}}, {{age}}{{/title}}', result: 'Profile: Fred, 32\n=================' },
      { text: '{{#title}}{{{nothing}}}{{/title}}', result: '\n' }
    ].forEach(test => expect(hb.compile(test.text)(data)).toEqual(test.result)));
});
