import { createElement as h } from 'react';
import { mount } from '@not-govuk/component-test-helpers';
import Tag from '../src/Tag';

describe('Tag', () => {
  describe('when given valid props', () => {
    const component = mount(h(Tag, { text: 'Test' }));

    it('renders', () => undefined);
  });

  describe('when given a text property', () => {
    const component = mount(h(Tag, { text: 'Alpha' }));

    it('contains the text provided', () => expect(component.text()).toEqual('Alpha'));
  });

  describe('when given a child', () => {
    const component = mount(h(Tag, {}, 'Alpha'));

    it('contains the child provided', () => expect(component.text()).toEqual('Alpha'));
  });
});
