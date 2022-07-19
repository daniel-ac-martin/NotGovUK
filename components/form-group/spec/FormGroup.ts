import { createElement as h } from 'react';
import { mount } from '@not-govuk/component-test-helpers';
import FormGroup from '../src/FormGroup.js';

describe('FormGroup', () => {
  describe('when given minimal valid props', () => {
    const props = {
      id: 'my-field',
      label: 'My field'
    };
    const component = mount(h(FormGroup, props, 'Child'));

    it('renders', () => undefined);
    it('contains a fieldset', () => expect(component.find('fieldset').length).toBeGreaterThan(0));
    it('does NOT contain a label', () => expect(component.find('label').length).toBe(0));
  });

  describe('when given all valid props', () => {
    const props = {
      error: 'Error',
      fieldId: 'my-field-input',
      hint: 'Hint',
      id: 'my-field',
      label: 'My field'
    };
    const component = mount(h(FormGroup, props, 'Child'));

    it('renders', () => undefined);
    it('does NOT contain a fieldset', () => expect(component.find('fieldset').length).toBe(0));
    it('contains a label', () => expect(component.find('label').length).toBeGreaterThan(0));
  });
});
