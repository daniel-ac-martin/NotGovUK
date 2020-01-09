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

  describe('when not given a href', () => {
    describe('and given an onClick prop', () => {
      const spy = jest.fn();
      const button = h(Button, {
        id: 'my-button',
        onClick: spy,
        value: 'Click me'
      });
      const component = shallow(button);

      it('is an input[type=button]', () => expect(component.find('input[type="button"]').length).toEqual(1));
      it('contains the expected text', () => expect(component.find('#my-button[value="Click me"]').length).toEqual(1));

      describe('when clicked', () => {
        component
          .find('#my-button')
          .simulate('click');

        it('calls the onClick prop', () => expect(spy).toHaveBeenCalled());
      });
    });
  });
});
