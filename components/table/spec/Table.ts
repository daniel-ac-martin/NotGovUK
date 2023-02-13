import { createElement as h } from 'react';
import { render, screen } from '@not-govuk/component-test-helpers';
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

    beforeEach(async () => {
      render(h(Table, props));
    });

    it('renders a table', async () => expect(screen.getByRole('table')).toBeInTheDocument());
    it('with the 1st column-header', async () => expect(screen.getAllByRole('columnheader')[0]).toHaveTextContent('Name'));
    it('with the 2nd column-header', async () => expect(screen.getAllByRole('columnheader')[1]).toHaveTextContent('Quantity'));
    it('with the 3rd column-header', async () => expect(screen.getAllByRole('columnheader')[2]).toHaveTextContent('Price'));
    it('with the 1st row-header', async () => expect(screen.getAllByRole('rowheader')[0]).toHaveTextContent('Blu-ray disk'));
    it('with the 2nd row-header', async () => expect(screen.getAllByRole('rowheader')[1]).toHaveTextContent('Pencil'));
    it('with the 3rd row-header', async () => expect(screen.getAllByRole('rowheader')[2]).toHaveTextContent('Text book'));
    it('with the correct number of rows', async () => expect(screen.getAllByRole('row')).toHaveLength(4));
    it('with the correct number of cells', async () => expect(screen.getAllByRole('cell')).toHaveLength(6));
  });
});
