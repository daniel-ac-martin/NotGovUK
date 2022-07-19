import { createElement as h } from 'react';
import { mount } from '@not-govuk/component-test-helpers';
import Checkboxes from '../src/Checkboxes.js';

describe('Checkboxes', () => {
  describe('when given minimal valid props', () => {
    const props = {
      label: 'Which types of waste do you transport?',
      name: 'waste',
      options: [
        { value: 'carcasses', label: 'Waste from animal carcasses' },
        { value: 'mines', label: 'Waste from mines or quarries' },
        { value: 'farm', label: 'Farm or agricultural waste' }
      ]
    };
    const component = mount(h(Checkboxes, props, 'Child'));

    it('renders', () => undefined);
  });

  describe('when given all valid props', () => {
    const props = {
      label: 'Which types of waste do you transport?',
      name: 'waste',
      options: [
        { value: 'carcasses', label: 'Waste from animal carcasses' },
        { value: 'mines', label: 'Waste from mines or quarries' },
        { value: 'farm', label: 'Farm or agricultural waste' }
      ],
      hint: 'Select all that apply.'
    };
    const component = mount(h(Checkboxes, props, 'Child'));

    it('renders', () => undefined);
  });
});
