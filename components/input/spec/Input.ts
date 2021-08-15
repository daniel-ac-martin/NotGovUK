import { createElement as h } from 'react';
import { mount } from '@not-govuk/component-test-helpers';
import Input from '../src/Input';

describe('Input', () => {
  const minimalProps = {
  };

  describe('when given minimal valid props', () => {
    const component = mount(h(Input, minimalProps));

    it('renders', () => undefined);
  });

  describe('when given all valid props', () => {
    const props = {
      prefix: 'Prefix',
      suffix: 'Suffix',
      width: 2
    };
    const component = mount(h(Input, props));

    it('renders', () => undefined);
  });
});
