import type { Meta, StoryObj } from '@storybook/react-vite';

import { Table } from '../src/Table';

const meta = {
  title: 'Table',
  parameters: {
    chromatic: {
      viewports: [640, 480]
    },
    description:
      'A component to make information easier to compare and scan for users.'
  },
  component: Table,
  args: {}
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { caption: 'Dates and amounts' },
  render: ({ ...props }) => (
    <Table
      {...props}
      keys={['date', 'amount']}
      headings={{
        amount: 'Amount',
        date: 'Date'
      }}
      data={[
        {
          amount: '£109.80 per week',
          date: 'First 6 weeks'
        },
        {
          amount: '£109.80 per week',
          date: 'Next 33 weeks'
        },
        {
          amount: '£4,282.20',
          date: 'Total estimated pay'
        }
      ]}
    />
  )
};

export const Captions: Story = {
  args: {},
  render: ({ ...props }) => (
    <Table
      {...props}
      caption={
        <caption className="govuk-table__caption govuk-table__caption--l">
          Months and rates
        </caption>
      }
      keys={['month', 'rate']}
      headings={{
        month: 'Month you apply',
        rate: 'Rate for vehicles'
      }}
      data={[
        {
          month: 'January',
          rate: '£95'
        },
        {
          month: 'February',
          rate: '£55'
        },
        {
          month: 'March',
          rate: '£125'
        }
      ]}
    />
  )
};

export const Standard: Story = {
  args: {},
  render: ({ ...props }) => (
    <Table
      {...props}
      keys={['date', 'amount']}
      headings={{
        amount: 'Amount',
        date: 'Date'
      }}
      data={[
        {
          amount: '£109.80 per week',
          date: 'First 6 weeks'
        },
        {
          amount: '£109.80 per week',
          date: 'Next 33 weeks'
        },
        {
          amount: '£4,282.20',
          date: 'Total estimated pay'
        }
      ]}
    />
  )
};
