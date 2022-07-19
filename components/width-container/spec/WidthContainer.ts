import { createElement as h } from 'react';
import { mount } from '@not-govuk/component-test-helpers';
import WidthContainer from '../src/WidthContainer.js';

describe('WidthContainer', () => {
  describe('when given valid props', () => {
    const component = mount(h(WidthContainer, {}));

    it('renders', () => undefined);
  });

  describe('when given a maximum width', () => {
    const component = mount(h(WidthContainer, { maxWidth: 1000 }, 'Child'));

    it('renders', () => undefined);
  });

  describe('when given a maximum width of -1', () => {
    const component = mount(h(WidthContainer, { maxWidth: -1 }, 'Child'));

    it('renders', () => undefined);
  });
});
