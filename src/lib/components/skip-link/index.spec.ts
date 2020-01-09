import SkipLink from './';

describe('SkipLink', () => {
  describe('when given a href and a text property', () => {
    const skipLink = h(SkipLink, { href: '#content', text: 'Skip to main content' });
    const component = shallow(skipLink);

    it('is a link', () => expect(component.find('a').length).toEqual(1));
    it('is a link with the text provided', () => expect(component.text()).toEqual('Skip to main content'));
    it('links to the href provided', () => expect(component.find('a[href="#content"]').length).toEqual(1));
  });
});
