import { createElement as h } from 'react';
import { mount } from '@not-govuk/component-test-helpers';
import Breadcrumbs from '../src/Breadcrumbs.js';

describe('Breadcrumbs', () => {
  describe('when given valid props', () => {
    const component = mount(h(Breadcrumbs, {
      items: [
        { text: 'One', href: '/one' },
        { text: 'Two', href: '/two' },
        { text: 'Three', href: '/three' }
      ]
    }));

    it('renders', () => undefined);
    it('contains the same number of items as were given to it', () => expect(component.find('li').length).toEqual(3));
    it('represents all the items as links', () => expect(component.find('li a').length).toEqual(3));
    it('contains the text of the items', () => expect(component.text()).toEqual('OneTwoThree'));
    it('links to the hrefs in the items', () => {
      expect(component.find('a[href="/one"]').length).toEqual(1);
      expect(component.find('a[href="/two"]').length).toEqual(1);
      expect(component.find('a[href="/three"]').length).toEqual(1);
    });
  });
});
