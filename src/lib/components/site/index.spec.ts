import Site from './';

describe.skip('Site', () => {
  describe('when given children', () => {
    const component = shallow(h(Site, {}, 'Content'));

    it('includes the children provided', () => expect(component.text()).toContain('Content'));
  });
});
