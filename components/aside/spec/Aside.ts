import { createElement as h } from 'react';
import { mount } from '@not-govuk/component-test-helpers';
import Aside from '../src/Aside';

describe('Aside', () => {
  describe('when given valid props', () => {
    const component = mount(h(Aside, {}, 'Child'));
    const text = component.text();

    it('renders', () => undefined);
    it('contains the children', () => expect(text).toContain('Child'));
  });
});
