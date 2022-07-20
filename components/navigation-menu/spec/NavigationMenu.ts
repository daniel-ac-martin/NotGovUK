import { createElement as h } from 'react';
import { mount } from '@not-govuk/component-test-helpers';
import NavigationMenu from '../src/NavigationMenu';

describe('NavigationMenu', () => {
  describe('when given minimal valid props', () => {
    const component = mount(h(NavigationMenu, { items: [
      { href: '#', text: 'One' },
      { href: '#', text: 'Two' },
      { href: '#', text: 'Three' }
    ] }));

    it('renders', () => undefined);
    it('contains as many link as were provided', () => expect(component.find('li a').length).toEqual(3));
    it('contains the link text provided', () => expect(component.text()).toEqual('OneTwoThree'));
  });

  describe('when given all valid props', () => {
    const component = mount(h(NavigationMenu, {
      classModifiers: 'horizontal',
      items: [
        { href: '#', text: 'One' },
        { href: '#', text: 'Two' },
        { href: '#', text: 'Three' }
      ]
    }));

    it('renders', () => undefined);
    it('contains as many link as were provided', () => expect(component.find('li a').length).toEqual(3));
    it('contains the link text provided', () => expect(component.text()).toEqual('OneTwoThree'));
  });
});
