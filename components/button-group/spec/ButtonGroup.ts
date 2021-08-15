import { createElement as h } from 'react';
import { mount } from '@not-govuk/component-test-helpers';
import ButtonGroup from '../src/ButtonGroup';

describe('ButtonGroup', () => {
  describe('when given valid props', () => {
    const component = mount(h(ButtonGroup, {}, 'Child'));

    it('renders', () => undefined);
  });
});
