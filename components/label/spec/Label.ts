import { createElement as h } from 'react';
import { mount } from '@not-govuk/component-test-helpers';
import Label from '../src/Label';

describe('Label', () => {
  describe('when given valid props', () => {
    const component = mount(h(Label, { htmlFor: 'field-id' }, 'My label'));

    it('renders', () => undefined);
  });
});
