import { createElement as h } from 'react';
import { mount } from '@not-govuk/component-test-helpers';
import WarningText from '../src/WarningText';

describe('WarningText', () => {
  describe('when given valid props', () => {
    const component = mount(h(WarningText, {}, 'Child'));

    it('renders', () => undefined);
  });
});
