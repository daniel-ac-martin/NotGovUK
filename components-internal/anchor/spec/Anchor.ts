import { shallow } from '@not-govuk/component-test-helpers';
import { createElement as h } from 'react';
import Anchor from '../src/Anchor';

describe('Anchor', () => {
  describe('when given a href with a relative URL', () => {
    const component = shallow(h(Anchor, { href: '/location' }, 'My link'));

    it('is a Link', () => expect(component.find('NavLink').length).toEqual(1));
    it('is a link to the HRef provided', () => expect(component.find('NavLink[to="/location"]').length).toEqual(1));
  });

  describe('when given a href with an absolute URL', () => {
    const component = shallow(h(Anchor, { href: '//example.com/location' }, 'My link'));

    it('is an anchor', () => expect(component.find('a').length).toEqual(1));
    it('is an anchor to the HRef provided', () => expect(component.find('a[href="//example.com/location"]').length).toEqual(1));
  });
});
