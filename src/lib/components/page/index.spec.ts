import Page from './';

describe('Page', () => {
  describe('when given children', () => {
    const page = h(Page, {}, 'Content');
    const component = mount(page);

    it('includes the children provided', () => expect(component.text()).toContain('Content'));
  });
});
