import Header from './';

describe('Header', () => {
  describe('when given nothing', () => {
    const header = h(Header);
    const component = shallow(header);

    it('is a header', () => expect(component.find('header').length).toEqual(1));
    it('with a logo link', () => expect(component.find('a#logo').length).toEqual(1));
    it('that links to GovUK', () => expect(component.find('a#logo[href="https://www.gov.uk/"]').length).toEqual(1));
  });

  describe('when given a logoHref', () => {
    const header = h(Header, { logoHref: '/logo/' });
    const component = shallow(header);

    it('is a header', () => expect(component.find('header').length).toEqual(1));
    it('with a logo link', () => expect(component.find('a#logo').length).toEqual(1));
    it('that links to the location provided', () => expect(component.find('a#logo[href="/logo/"]').length).toEqual(1));
  });

  describe('when given a title and titleHref', () => {
    const header = h(Header, {
      title: 'My service',
      titleHref: '/my-service/'
    });
    const component = shallow(header);

    it('is a header', () => expect(component.find('header').length).toEqual(1));
    it('contains a service title link', () => expect(component.find('a#service-title').length).toEqual(1));
    it('that links to the HRef', () => expect(component.find('a#service-title[href="/my-service/"]').length).toEqual(1));
    it('with the text provided', () => expect(component.find('a#service-title').text()).toEqual('My service'));
  });

  describe('when given a list of navigation links', () => {
    const header = h(Header, {
      navigation: [
        { text: 'One', href: '/one' },
        { text: 'Two', href: '/two' },
        { text: 'Three', href: '/three' }
      ]
    });
    const component = shallow(header);

    it('contains the same number of navigation links as were given to it', () => expect(component.find('li > a').length).toEqual(3));
    it('contains the text of the items', () => expect(component.text()).toEqual('OneTwoThree'));
    it('links to the hrefs in the items', () =>
      expect(component.find('a[href="/one"]').length).toEqual(1) &&
      expect(component.find('a[href="/two"]').length).toEqual(1) &&
      expect(component.find('a[href="/three"]').length).toEqual(1));
  });
});
