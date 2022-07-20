import { createElement as h } from 'react';
import { mount } from '@not-govuk/component-test-helpers';
import TextInput from '../src/TextInput';

describe('TextInput', () => {
  describe('when given minimal valid props', () => {
    const props = {
      label: 'Name',
      name: 'name',
    };
    const component = mount(h(TextInput, props));

    it('renders', () => undefined);
  });

  describe('when given all valid props', () => {
    const props = {
      label: 'Name',
      name: 'name',
      error: 'Enter your full name',
      hint: 'Your full name'
    };
    const component = mount(h(TextInput, props));

    it('renders', () => undefined);
  });
});
