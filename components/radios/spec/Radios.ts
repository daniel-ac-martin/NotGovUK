import { createElement as h } from 'react';
import { mount } from '@not-govuk/component-test-helpers';
import Radios from '../src/Radios.js';

describe('Radios', () => {
  describe('when given minimal valid props', () => {
    const props = {
      label: 'Where do you live?',
      name: 'where-do-you-live',
      options: [
        { value: 'england', label: 'England' },
        { value: 'scotland', label: 'Scotland' },
        { value: 'wales', label: 'Wales' },
        { value: 'northern-ireland', label: 'Northern Ireland' }
      ]
    };
    const component = mount(h(Radios, props, 'Child'));

    it('renders', () => undefined);
  });

  describe('when given all valid props', () => {
    const props = {
      label: 'Where do you live?',
      name: 'where-do-you-live',
      options: [
        { value: 'england', label: 'England' },
        { value: 'scotland', label: 'Scotland' },
        { value: 'wales', label: 'Wales' },
        { value: 'northern-ireland', label: 'Northern Ireland' },
        'or',
        { value: 'abroad', label: 'None of the above', hint: 'I am a British citizen living abroad' }
      ],
      error: 'Select an option',
      hint: 'Select one.',
      inline: true,
      small: true
    };
    const component = mount(h(Radios, props, 'Child'));

    it('renders', () => undefined);
  });
});
