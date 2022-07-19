import { createElement as h } from 'react';
import { mount } from '@not-govuk/component-test-helpers';
import Panel from '../src/Panel.js';

describe('Panel', () => {
  describe('when given valid props', () => {
    const component = mount(h(Panel, { title: 'My heading' }, 'Child'));

    it('renders', () => undefined);
  });
});
