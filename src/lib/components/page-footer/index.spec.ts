import PageFooter from './';

describe('PageFooter', () => {
  describe('when given children', () => {
    const pageFooter = h(PageFooter, {}, 'Content');
    const component = shallow(pageFooter);

    it('is a footer', () => expect(component.find('footer').length).toEqual(1));
    it('includes the children provided', () => expect(component.find('footer').text()).toEqual('Content'));
  });
});
