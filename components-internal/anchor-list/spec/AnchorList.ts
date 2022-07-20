import { createElement as h } from 'react';
import { mount } from '@not-govuk/component-test-helpers';
import AnchorList from '../src/AnchorList';

describe('AnchorList', () => {
  describe('when given minimal valid props', () => {
    const component = mount(h(AnchorList, { items: [
      { href: '#', text: 'One' },
      { href: '#', text: 'Two' },
      { href: '#', text: 'Three' }
    ] }));

    it('renders', () => undefined);
    it('contains as many link as were provided', () => expect(component.find('li a').length).toEqual(3));
    it('contains the link text provided', () => expect(component.text()).toEqual('OneTwoThree'));
  });

  describe('when given all valid props', () => {
    const component = mount(h(AnchorList, {
      as: 'ol',
      items: [
        { href: '#', text: 'One' },
        { href: '#', text: 'Two' },
        { href: '#', text: 'Three' }
      ]
    }));

    it('renders', () => undefined);
    it('contains the component provided', () => expect(component.find('ol').length).toEqual(1));
    it('contains as many link as were provided', () => expect(component.find('ol > li a').length).toEqual(3));
    it('contains the link text provided', () => expect(component.text()).toEqual('OneTwoThree'));
  });
});
