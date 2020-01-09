import Breadcrumbs from './';

describe('Breadcrumbs', () => {
  describe('when given a list of items', () => {
    const breadcrumbs = h(Breadcrumbs, {
      items: [
        { text: 'One', href: '/one' },
        { text: 'Two', href: '/two' },
        { text: 'Three', href: '/three' }
      ]
    });
    const component = shallow(breadcrumbs);

    it('contains the same number of items as were given to it', () => expect(component.find('li').length).toEqual(3));
    it('represents all but one of the items as links', () => expect(component.find('a').length).toEqual(2));
    it('contains the text of the items', () => expect(component.text()).toEqual('OneTwoThree'));
    it('links to the hrefs in the items', () => expect(component.find('a[href="/one"]').length).toEqual(1) && expect(component.find('a[href="/two"]').length).toEqual(1));
  });
});
