import { createElement as h } from 'react';
import { mount } from '@not-govuk/component-test-helpers';
import Table from '../src/Table';

describe('Table', () => {
  describe('when given valid props', () => {
    const props = {
      keys: ['name', 'qty', 'cost'],
      headings: {
        cost: 'Price',
        qty: 'Quantity',
        name: 'Name'
      },
      data: [
        {
          cost: '£7.99',
          qty: '4',
          name: 'Blu-ray disk'
        },
        {
          cost: '£0.85',
          qty: '10',
          name: 'Pencil'
        },
        {
          cost: '£21.45',
          qty: '1',
          name: 'Text book'
        },
      ]
    };
    const component = mount(h(Table, props));

    it('renders', () => undefined);
  });
});
