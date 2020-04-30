import { shallow } from 'enzyme';
import { createElement as h } from 'react';
import Details from './';

describe('Details', () => {
  describe('when given a summary and children', () => {
    const details = h(Details, { summary: 'Summary' }, 'Content');
    const component = shallow(details);

    it('includes a summary', () => expect(component.find('summary').length).toEqual(1));
    it('includes a summary with the text provided', () => expect(component.find('summary').text()).toEqual('Summary'));
    it('includes the children provided', () => expect(component.find('.govuk-details__text').text()).toEqual('Content'));
  });
});
