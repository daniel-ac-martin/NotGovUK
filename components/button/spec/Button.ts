import { createElement as h } from 'react';
import { mount } from '@not-govuk/component-test-helpers';
import Button from '../src/Button';

describe('Button', () => {
  const minimalProps = {
  };

  describe('when given minimal valid props', () => {
    const component = mount(h(Button, minimalProps));

    it('renders', () => undefined);
    it('is a button', () => expect(component.find('button').length).toEqual(1));
  });

  describe('when given all valid props (inc. href)', () => {
    const props = {
      ...minimalProps,
      disabled: true,
      href: '/foo/bar',
      id: 'my-button',
      start: true
    };
    const component = mount(h(Button, props, 'Go'));

    it('renders', () => undefined);
    it('is an anchor', () => expect(component.find('a').length).toEqual(1));
    it('contains the expected text', () => expect(component.find('a').text()).toEqual('Go'));
  });

  describe('when given all valid props besides a href', () => {
    const spy = jest.fn();
    const props = {
      ...minimalProps,
      disabled: true,
      id: 'my-button',
      onClick: spy,
      start: true
    };
    const component = mount(h(Button, props, 'Go'));

    it('renders', () => undefined);
    it('is a button', () => expect(component.find('button').length).toEqual(1));
    it('contains the expected text', () => expect(component.find('button').text()).toEqual('Go'));

    describe.skip('when clicked', () => {
      component
        .find('button#my-button')
        .simulate('click');

      it('calls the onClick prop', () => expect(spy).toHaveBeenCalled());
    });
  });
});
