import { createElement as h } from 'react';
import { mount } from '@not-govuk/component-test-helpers';
import Anchor from '../src/Anchor.js';

describe('Anchor', () => {
  describe('when given a href with a relative URL', () => {
    const component = mount(h(Anchor, { href: '/location' }, 'My link'));

    it('is a Link', () => expect(component.find('NavLink').length).toEqual(1));
    it('is a link to the HRef provided', () => expect(component.find('a[href="/location"]').length).toEqual(1));
  });

  describe('when given a href with an absolute URL', () => {
    const component = mount(h(Anchor, { href: '//example.com/location' }, 'My link'));

    it('is NOT a Link', () => expect(component.find('NavLink').length).toEqual(0));
    it('is an anchor', () => expect(component.find('a').length).toEqual(1));
    it('is an anchor to the HRef provided', () => expect(component.find('a[href="//example.com/location"]').length).toEqual(1));
  });

  describe('when given a href with a hash link', () => {
    const component = mount(h(Anchor, { href: '#top' }, 'My link'));

    it('is a Link', () => expect(component.find('NavLink').length).toEqual(1));
    it('is an anchor to the HRef provided', () => expect(component.find('a[href="/current#top"]').length).toEqual(1));
  });

  describe('when given a href with a mailto', () => {
    const component = mount(h(Anchor, { href: 'mailto:user@example.com' }, 'My link'));

    it('is NOT a Link', () => expect(component.find('NavLink').length).toEqual(0));
    it('is an anchor', () => expect(component.find('a').length).toEqual(1));
    it('is an anchor to the HRef provided', () => expect(component.find('a[href="mailto:user@example.com"]').length).toEqual(1));
  });
});
