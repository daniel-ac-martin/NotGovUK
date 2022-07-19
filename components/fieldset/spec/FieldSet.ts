import { createElement as h } from 'react';
import { mount } from '@not-govuk/component-test-helpers';
import FieldSet from '../src/FieldSet.js';

describe('FieldSet', () => {
  describe('when given valid props', () => {
    const component = mount(h(FieldSet, { legend: 'My legend' }, 'Child'));

    it('renders', () => undefined);
  });
});
