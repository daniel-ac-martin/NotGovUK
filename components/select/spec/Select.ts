import { createElement as h } from 'react';
import { mount } from '@not-govuk/component-test-helpers';
import Select from '../src/Select.js';

describe('Select', () => {
  describe('when given minimal valid props', () => {
    const props = {
      label: 'Sort by',
      name: 'sort',
      options: [
        { value: 'published', label: 'Recently published' },
        { value: 'updated', label: 'Recently updated', selected: true },
        { value: 'views', label: 'Most views' },
        { value: 'comments', label: 'Most comments' }
      ]
    };
    const component = mount(h(Select, props));

    it('renders', () => undefined);
  });

  describe('when given all valid props', () => {
    const props = {
      label: 'Sort by',
      name: 'sort',
      options: [
        { value: 'published', label: 'Recently published' },
        { value: 'updated', label: 'Recently updated', selected: true },
        { value: 'views', label: 'Most views' },
        { value: 'comments', label: 'Most comments' }
      ],
      hint: 'Pick some',
      multiple: true
    };
    const component = mount(h(Select, props));

    it('renders', () => undefined);
  });
});
