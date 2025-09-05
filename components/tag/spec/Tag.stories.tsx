import type { Meta, StoryObj } from '@storybook/react-vite';

import { Table } from '@not-govuk/table';
import { Tag } from '../src/Tag';

const meta = {
  title: 'Tag',
  parameters: {
    chromatic: {
      viewports: [320, 320]
    },
    description: 'A component to display the status of something.'
  },
  component: Tag,
  args: { children: 'Completed' }
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {}
};

export const Standard: Story = {
  args: {}
};

export const OneOrTwo: Story = {
  args: { children: undefined },
  render: ({ ...props }) => (
    <Table
      keys={['name', 'status']}
      headings={{
        name: 'Name of user',
        status: 'Status'
      }}
      data={[
        {
          name: 'Rachel Silver',
          status: (
            <Tag {...props} classModifiers="grey">
              Inactive
            </Tag>
          )
        },
        {
          name: 'Jesse Smith',
          status: <Tag classModifiers="grey">Inactive</Tag>
        },
        {
          name: 'Joshua Wessel',
          status: <Tag>Active</Tag>
        },
        {
          name: 'Rachel Pepper',
          status: <Tag>Active</Tag>
        },
        {
          name: 'Stuart Say',
          status: <Tag classModifiers="grey">Inactive</Tag>
        },
        {
          name: 'Laura Frith',
          status: <Tag>Active</Tag>
        },
        {
          name: 'Tim Harvey',
          status: <Tag classModifiers="grey">Inactive</Tag>
        }
      ]}
    />
  ),
  name: 'One or two'
};

export const Multiple: Story = {
  args: { children: undefined },
  render: ({ ...props }) => (
    <Table
      keys={['name', 'status']}
      headings={{
        name: 'Applicaton',
        status: 'Status'
      }}
      data={[
        {
          name: 'Joshua Wessel',
          status: (
            <Tag {...props} classModifiers="red">
              Urgent
            </Tag>
          )
        },
        {
          name: 'Rachel Silver',
          status: <Tag classModifiers="blue">New</Tag>
        },
        {
          name: 'Laura Frith',
          status: <Tag classModifiers="blue">New</Tag>
        },
        {
          name: 'Paul French',
          status: <Tag classModifiers="blue">New</Tag>
        },
        {
          name: 'Jesse Smith',
          status: <Tag classModifiers="blue">New</Tag>
        },
        {
          name: 'Rachel Pepper',
          status: <Tag classModifiers="green">Finished</Tag>
        },
        {
          name: 'Emma Tennant',
          status: <Tag classModifiers="yellow">Waiting on</Tag>
        }
      ]}
    />
  )
};

export const Colours: Story = {
  args: { children: undefined },
  render: ({ ...props }) => (
    <Table
      keys={['modifier', 'result']}
      headings={{
        modifier: 'classModifier',
        result: 'Tag'
      }}
      data={[
        {
          modifier: <code>grey</code>,
          result: (
            <Tag {...props} classModifiers="grey">
              Inactive
            </Tag>
          )
        },
        {
          modifier: <code>green</code>,
          result: <Tag classModifiers="green">New</Tag>
        },
        {
          modifier: <code>turquoise</code>,
          result: <Tag classModifiers="turquoise">Active</Tag>
        },
        {
          modifier: <code>blue</code>,
          result: <Tag classModifiers="blue">Pending</Tag>
        },
        {
          modifier: <code>purple</code>,
          result: <Tag classModifiers="purple">Received</Tag>
        },
        {
          modifier: <code>pink</code>,
          result: <Tag classModifiers="pink">Sent</Tag>
        },
        {
          modifier: <code>red</code>,
          result: <Tag classModifiers="red">Rejected</Tag>
        },
        {
          modifier: <code>orange</code>,
          result: <Tag classModifiers="orange">Declined</Tag>
        },
        {
          modifier: <code>yellow</code>,
          result: <Tag classModifiers="yellow">Delayed</Tag>
        }
      ]}
    />
  )
};
