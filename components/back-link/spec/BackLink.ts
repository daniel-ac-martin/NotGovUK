import { createElement as h } from 'react';
import { mount } from '@not-govuk/component-test-helpers';
import BackLink from '../src/BackLink';

describe('BackLink', () => {
  describe('when given a href', () => {
    describe('and a text property', () => {
      const backLink = h(BackLink, { href: '/back', text: 'Reverse' });
      const component = mount(backLink);

      it('is a link', () => expect(component.find('A').length).toEqual(1));
      it('is a link with the text provided', () =>expect(component.find('A[children="Reverse"]').length).toEqual(1));
      it('links to the href provided', () => expect(component.find('A[href="/back"]').length).toEqual(1));
    });

    describe('but NOT a text property', () => {
      const backLink = h(BackLink, { href: '/back' });
      const component = mount(backLink);

      it('is a link', () => expect(component.find('A').length).toEqual(1));
      it('is a link with the text \'Back\'', () => expect(component.find('A[children="Back"]').length).toEqual(1));
      it('links to the href provided', () => expect(component.find('A[href="/back"]').length).toEqual(1));
    });
  });

  describe('when NOT given a href', () => {
    const backLink = h(BackLink, { id: 'back' });
    const component = mount(backLink);

    it('is a link', () => expect(component.find('a').length).toEqual(1));
    it('is a link with the text \'Back\'', () => expect(component.find('a[children="Back"]').length).toEqual(1));

    describe.skip('when clicked', () => {
      component
        .find('a#back')
        .simulate('click');

      it('takes a step back in the history', () => expect(false).toEqual(true));
    });
  });
});
