import Header from './';

describe('Header', () => {
  describe('when given nothing', () => {
    const header = h(Header);
    const component = shallow(header);

    it('is a header', () => expect(component.find('header').length).toEqual(1));
    it('with a logo link', () => expect(component.find('.govuk-header__logo > A').length).toEqual(1));
    it('that links to GovUK', () => expect(component.find('.govuk-header__logo > A[href="https://www.gov.uk/"]').length).toEqual(1));
  });

  describe('when given a logoHref', () => {
    const header = h(Header, { logoHref: '/logo/' });
    const component = shallow(header);

    it('is a header', () => expect(component.find('header').length).toEqual(1));
    it('with a logo link', () => expect(component.find('.govuk-header__logo > A').length).toEqual(1));
    it('that links to the location provided', () => expect(component.find('.govuk-header__logo > A[href="/logo/"]').length).toEqual(1));
  });

  describe('when given a title and titleHref', () => {
    const header = h(Header, {
      title: 'My service',
      titleHref: '/my-service/'
    });
    const component = shallow(header);

    it('is a header', () => expect(component.find('header').length).toEqual(1));
    it('contains a service title link', () => expect(component.find('A.govuk-header__link--service-name').length).toEqual(1));
    it('that links to the HRef', () => expect(component.find('A.govuk-header__link--service-name[href="/my-service/"]').length).toEqual(1));
    it('with the text provided', () => expect(component.find('A.govuk-header__link--service-name[children="My service"]').length).toEqual(1));
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

    it('contains the same number of navigation links as were given to it', () => expect(component.find('li > A').length).toEqual(3));
    it.skip('contains the text of the items', () => expect(component.text()).toEqual('OneTwoThree'));
    it('links to the hrefs in the items', () =>
      expect(component.find('A[href="/one"]').length).toEqual(1) &&
      expect(component.find('A[href="/two"]').length).toEqual(1) &&
      expect(component.find('A[href="/three"]').length).toEqual(1));
  });
});
