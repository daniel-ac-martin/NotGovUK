import type { Meta, StoryObj } from '@storybook/react-vite';

import { SimpleTable } from '../src/SimpleTable';

const meta = {
  title: 'Base/SimpleTable',
  parameters: {},
  component: SimpleTable,
  args: {}
} satisfies Meta<typeof SimpleTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: ({ ...props }) => (
    <SimpleTable
      {...props}
      keys={['name', 'qty', 'cost']}
      headings={{
        cost: 'Price',
        qty: 'Quantity',
        name: 'Name'
      }}
      data={[
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
        }
      ]}
    />
  )
};

export const Standard: Story = {
  args: {},
  render: ({ ...props }) => (
    <SimpleTable
      {...props}
      keys={['name', 'qty', 'cost']}
      headings={{
        cost: 'Price',
        qty: 'Quantity',
        name: 'Name'
      }}
      data={[
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
        }
      ]}
    />
  )
};
