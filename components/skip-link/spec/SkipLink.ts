import { createElement as h } from 'react';
import { mount } from '@not-govuk/component-test-helpers';
import SkipLink from '../src/SkipLink';

describe('SkipLink', () => {
  describe('when given minimal valid props', () => {
    const component = mount(h(SkipLink, { for: 'content' }));

    it('renders', () => undefined);
    it('contains a link', () => expect(component.find('a').length).toBeTruthy());
    it('contains a link to the content', () => expect(component.find('a[href="#content"]').length).toBeTruthy());
  });

  describe('when given all valid props', () => {
    const component = mount(h(SkipLink, { for: 'content' }, 'Skip ahead'));

    it('renders', () => undefined);
    it('contains a link', () => expect(component.find('a').length).toBeTruthy());
    it('contains a link to the content', () => expect(component.find('a[href="#content"]').length).toBeTruthy());
    it('contains the children', () => expect(component.text()).toContain('Skip ahead'));
  });
});
