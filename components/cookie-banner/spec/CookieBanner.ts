import { createElement as h } from 'react';
import { mount } from '@not-govuk/component-test-helpers';
import CookieBanner from '../src/CookieBanner';

describe('CookieBanner', () => {
  const minimalProps = {
    messages: [{
      content: 'My message'
    }]
  };

  describe('when given minimal valid props', () => {
    const component = mount(h(CookieBanner, minimalProps));

    it('renders', () => undefined);
    it('contains the expected text', () => expect(component.text()).toContain('My message'));
  });

  describe('when given all valid props', () => {
    const props = {
      ...minimalProps,
      maxContentsWidth: -1,
      messages: [
        {
          heading: 'One',
          content: 'My message',
          actions: 'Action'
        },
        {
          heading: 'Two',
          content: 'My message',
          actions: 'Action'
        }
      ]
    };
    const component = mount(h(CookieBanner, props));

    it('renders', () => undefined);
    it('contains the expected text', () => expect(component.text()).toContain('My message'));
    it('contains the first message', () => expect(component.text()).toContain('One'));
    it('contains the second message', () => expect(component.text()).toContain('Two'));
    it('contains the action', () => expect(component.text()).toContain('Action'));
  });
});
