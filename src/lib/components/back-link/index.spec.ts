import BackLink from './';

describe('BackLink', () => {
  describe('when given a href', () => {
    describe('and a text property', () => {
      const backLink = h(BackLink, { href: '/back', text: 'Reverse' });
      const component = shallow(backLink);

      it('is a link', () => expect(component.find('a').length).toEqual(1));
      it('is a link with the text provided', () => expect(component.text()).toEqual('Reverse'));
      it('links to the href provided', () => expect(component.find('a[href="/back"]').length).toEqual(1));
    });

    describe('but NOT a text property', () => {
      const backLink = h(BackLink, { href: '/back' });
      const component = shallow(backLink);

      it('is a link', () => expect(component.find('a').length).toEqual(1));
      it('is a link with the text \'Back\'', () => expect(component.text()).toEqual('Back'));
      it('links to the href provided', () => expect(component.find('a[href="/back"]').length).toEqual(1));
    });
  });

  describe('when NOT given a href', () => {
    const backLink = h(BackLink);
    const component = shallow(backLink);

    it('is a link', () => expect(component.find('a').length).toEqual(1));
    it('is a link with the text \'Back\'', () => expect(component.text()).toEqual('Back'));

    describe.skip('when clicked', () => {
      component
        .find('a.back')
        .simulate('click');

      it('takes a step back in the history', () => expect(false).toEqual(true));
    });
  });
});
