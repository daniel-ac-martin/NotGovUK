import { createElement as h } from 'react';
import { mount } from '@not-govuk/component-test-helpers';
import VisuallyHidden from '../src/VisuallyHidden.js';

describe('VisuallyHidden', () => {
  describe('when given valid props', () => {
    const component = mount(h(VisuallyHidden, {}, 'Text'));

    it('renders', () => undefined);
  });
});
