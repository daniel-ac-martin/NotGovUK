import Button from './';

describe('Button', () => {
  describe('when given a href', () => {
    const button = h(Button, {
      href: '#',
      value: 'Go'
    });
    const component = shallow(button);

    it('is an anchor', () => expect(component.find('a').length).toEqual(1));
    it('contains the expected text', () => expect(component.text()).toEqual('Go'));
  });
});
