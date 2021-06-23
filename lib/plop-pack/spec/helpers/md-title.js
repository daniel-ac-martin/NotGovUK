'use strict';

const hb = require('handlebars');
const mdTitle = require('../../src/helpers/md-title');
hb.registerHelper('mdTitle', mdTitle);

const data = {
  name: 'Fred',
  age: 32,
  favouriteIceCream: 'tuti fruti'
};

describe('handlebars template helper: mdTitle', () => {
  it('should be a function', () => expect(mdTitle).toBeInstanceOf(Function));
  it('should under-equals the given text', () => [
      { text: 'A', result: 'A\n=' },
      { text: 'Apples', result: 'Apples\n======' },
      { text: 'A slightly longer example', result: 'A slightly longer example\n=========================' },
      { text: '', result: '\n' }
    ].forEach(test => expect(mdTitle({ fn: () => test.text })).toEqual(test.result)));
  it('should produce a markdown title from a template and data', () => [
      { text: '{{#mdTitle}}A{{/mdTitle}}', result: 'A\n=' },
      { text: '{{#mdTitle}}Apples{{/mdTitle}}', result: 'Apples\n======' },
      { text: '{{#mdTitle}}{{favouriteIceCream}}, yum!!{{/mdTitle}}', result: 'tuti fruti, yum!!\n=================' },
      { text: '{{#mdTitle}}Profile: {{{name}}}, {{age}}{{/mdTitle}}', result: 'Profile: Fred, 32\n=================' },
      { text: '{{#mdTitle}}{{{nothing}}}{{/mdTitle}}', result: '\n' }
    ].forEach(test => expect(hb.compile(test.text)(data)).toEqual(test.result)));
});
