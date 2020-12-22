import { createElement as h } from 'react';
import { mount } from '@not-govuk/component-test-helpers';
import PhaseBanner from '../src/PhaseBanner';

describe('PhaseBanner', () => {
  describe('when given valid props', () => {
    const component = mount(h(PhaseBanner, { phase: 'test' }, 'This is just a test.'));

    it('renders', () => undefined);
    it('declares the phase provided', () => expect(component.text()).toContain('test'))
    it('displays the message provided', () => expect(component.text()).toContain('This is just a test.'))
  });
});
