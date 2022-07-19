import { createElement as h } from 'react';
import { mount } from '@not-govuk/component-test-helpers';
import Textarea from '../src/Textarea.js';

describe('Textarea', () => {
  describe('when given minimal valid props', () => {
    const props = {
      label: 'Description',
      name: 'desc',
    };
    const component = mount(h(Textarea, props));

    it('renders', () => undefined);
  });

  describe('when given all valid props', () => {
    const props = {
      label: 'Description',
      name: 'desc',
      error: 'Write a description',
      hint: 'Describe the thing'
    };
    const component = mount(h(Textarea, props));

    it('renders', () => undefined);
  });
});
