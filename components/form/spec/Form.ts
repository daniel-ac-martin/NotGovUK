import { createElement as h } from 'react';
import { mount } from '@not-govuk/component-test-helpers';
import Form from '../src/Form.js';

describe('Form', () => {
  describe('when given valid props', () => {
    const component = mount(h(Form, { action: '.', method: 'get' }, 'Child'));

    it('renders', () => undefined);
  });
});
