import { shallow } from 'enzyme';
import { createElement as h } from 'react';
import Tag from './';

describe('Tag', () => {
  describe('when given a text property', () => {
    const tag = h(Tag, { text: 'Alpha' });
    const component = shallow(tag);

    it('contains the text provided', () => expect(component.text()).toEqual('Alpha'));
  });
});
