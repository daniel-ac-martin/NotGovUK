import { createElement as h } from 'react';
import { mount } from '@not-govuk/component-test-helpers';
import Link from '../src/Link';

describe('Link', () => {
  describe('when given valid props', () => {
    const component = mount(h(Link, { href: '#' }, 'Text'));

    it('renders', () => undefined);
  });
});
