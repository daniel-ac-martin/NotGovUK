import Anchor from './';

describe('Anchor', () => {
  describe('when given a href', () => {
    const anchor = h(Anchor, { href: '/location' });
    const component = shallow(anchor);

    it('is a Link', () => expect(component.find('Link').length).toEqual(1));
    it('is a link to the HRef provided', () => expect(component.find('Link[to="/location"]').length).toEqual(1));
  });
});
