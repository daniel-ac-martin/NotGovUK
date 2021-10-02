import { createElement as h } from 'react';
import { mount } from '@not-govuk/component-test-helpers';
import Hint from '../src/Hint';

describe('Hint', () => {
  describe('when given valid props', () => {
    const component = mount(h(Hint, { id: 'field-id-hint' }, 'Hint text'));

    it('renders', () => undefined);
  });
});
