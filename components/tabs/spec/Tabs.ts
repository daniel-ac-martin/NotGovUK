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
    it('shows the first panel', () => expect(component.find('.govuk-tabs__panel:not(.govuk-tabs__panel--hidden)').text()).toEqual('A-content'));
  });

  describe('when given all valid props', () => {
    const component = mount(h(Tabs, {
      initial: 'b1',
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
    it('shows the chosen panel', () => expect(component.find('.govuk-tabs__panel:not(.govuk-tabs__panel--hidden)').text()).toEqual('B-content'));
  });
});
