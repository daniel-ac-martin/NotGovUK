import { createElement as h } from 'react';
import { mount } from '@not-govuk/component-test-helpers';
import Tabs from '../src/Tabs';

describe('Tabs', () => {
  describe('when given minimal valid props', () => {
    const component = mount(h(Tabs, {
      items: [
        {
          id: 'a1',
          label: 'AAA',
          content: h('p', {}, 'A-content')
        },
        {
          id: 'b1',
          label: 'BBB',
          content: h('p', {}, 'B-content')
        },
        {
          id: 'c1',
          label: 'CCC',
          content: h('p', {}, 'C-content')
        }
      ]
    }));

    it('renders', () => undefined);
    it('contains the labels', () => expect(component.text()).toContain('AAABBBCCC'));
    it('contains the content', () => expect(component.text()).toContain('A-contentB-contentC-content'));
  });
});
