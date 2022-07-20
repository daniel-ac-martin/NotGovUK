import { createElement as h } from 'react';
import { mount } from '@not-govuk/component-test-helpers';
import DateInput from '../src/DateInput';

describe('DateInput', () => {
  describe('when given valid props', () => {
    const component = mount(h(DateInput, { heading: 'My heading' }, 'Child'));

    it('renders', () => undefined);
  });
});
