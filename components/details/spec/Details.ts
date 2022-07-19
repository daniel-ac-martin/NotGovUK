import { createElement as h } from 'react';
import { mount } from '@not-govuk/component-test-helpers';
import Details from '../src/Details.js';

describe('Details', () => {
  describe('when given valid props', () => {
    const component = mount(h(Details, { summary: 'Summary' }, 'Content'));

    it('renders', () => undefined);
    it('includes a summary', () => expect(component.find('summary').length).toEqual(1));
    it('includes the summary provided', () => expect(component.find('summary').text()).toEqual('Summary'));
    it('includes the children provided', () => expect(component.text()).toContain('Content'));
  });
});
