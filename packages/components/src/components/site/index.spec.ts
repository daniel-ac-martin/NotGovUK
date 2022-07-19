import { shallow } from 'enzyme';
import { createElement as h } from 'react';
import Site from './index.js';

describe.skip('Site', () => {
  describe('when given children', () => {
    const component = shallow(h(Site, {}, 'Content'));

    it('includes the children provided', () => expect(component.text()).toContain('Content'));
  });
});
