import { createElement as h } from 'react';
import { mount } from '@not-govuk/component-test-helpers';
import ErrorMessage from '../src/ErrorMessage';

describe('ErrorMessage', () => {
  describe('when given valid props', () => {
    const component = mount(h(ErrorMessage, {}, 'Invalid'));

    it('renders', () => undefined);
  });
});
