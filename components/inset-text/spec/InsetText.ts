import { createElement as h } from 'react';
import { mount } from '@not-govuk/component-test-helpers';
import InsetText from '../src/InsetText';

describe('InsetText', () => {
  describe('when given valid props', () => {
    const component = mount(h(InsetText, {}, 'Child'));

    it('renders', () => undefined);
  });
});
