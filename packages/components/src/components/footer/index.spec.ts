import { shallow } from 'enzyme';
import { createElement as h } from 'react';
import Footer from './';

describe('Footer', () => {
  describe('when given children', () => {
    const footer = h(Footer, {}, 'Content');
    const component = shallow(footer);

    it('is a footer', () => expect(component.find('PageFooter').length).toEqual(1));
    it.skip('includes the children provided', () => expect(component.find('PageFooter').text()).toContain('Content'));
  });
});
