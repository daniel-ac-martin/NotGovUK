import type { Meta, StoryObj } from '@storybook/react-vite';

import { Fragment } from 'react';
import { Table } from '@not-govuk/table';
import { Tabs } from '../src/Tabs';

const meta = {
  title: 'Tabs',
  parameters: {
    chromatic: {
      viewports: [640, 480]
    },
    description:
      'A component that lets users navigate between related sections of content, displaying one section at a time.'
  },
  component: Tabs,
  args: {}
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: ({ ...props }) => (
    <Tabs
      {...props}
      items={[
        {
          label: 'Past day',
          id: 'past-day',
          content: (
            <Fragment>
              <h2>Past day</h2>
              <Table
                keys={['manager', 'opened', 'closed']}
                headings={{
                  manager: 'Case manager',
                  opened: 'Cases opened',
                  closed: 'Cases closed'
                }}
                data={[
                  {
                    manager: 'David Francis',
                    opened: '3',
                    closed: '0'
                  },
                  {
                    manager: 'Paul Farmer',
                    opened: '1',
                    closed: '0'
                  },
                  {
                    manager: 'Rita Patel',
                    opened: '2',
                    closed: '0'
                  }
                ]}
              />
            </Fragment>
          )
        },
        {
          label: 'Past week',
          id: 'past-week',
          content: (
            <Fragment>
              <h2>Past week</h2>
              <Table
                keys={['manager', 'opened', 'closed']}
                headings={{
                  manager: 'Case manager',
                  opened: 'Cases opened',
                  closed: 'Cases closed'
                }}
                data={[
                  {
                    manager: 'David Francis',
                    opened: '24',
                    closed: '18'
                  },
                  {
                    manager: 'Paul Farmer',
                    opened: '16',
                    closed: '20'
                  },
                  {
                    manager: 'Rita Patel',
                    opened: '24',
                    closed: '27'
                  }
                ]}
              />
            </Fragment>
          )
        },
        {
          label: 'Past month',
          id: 'past-month',
          content: (
            <Fragment>
              <h2>Past month</h2>
              <Table
                keys={['manager', 'opened', 'closed']}
                headings={{
                  manager: 'Case manager',
                  opened: 'Cases opened',
                  closed: 'Cases closed'
                }}
                data={[
                  {
                    manager: 'David Francis',
                    opened: '98',
                    closed: '95'
                  },
                  {
                    manager: 'Paul Farmer',
                    opened: '122',
                    closed: '131'
                  },
                  {
                    manager: 'Rita Patel',
                    opened: '126',
                    closed: '142'
                  }
                ]}
              />
            </Fragment>
          )
        },
        {
          label: 'Past year',
          id: 'past-year',
          content: (
            <Fragment>
              <h2>Past year</h2>
              <Table
                keys={['manager', 'opened', 'closed']}
                headings={{
                  manager: 'Case manager',
                  opened: 'Cases opened',
                  closed: 'Cases closed'
                }}
                data={[
                  {
                    manager: 'David Francis',
                    opened: '1380',
                    closed: '1472'
                  },
                  {
                    manager: 'Paul Farmer',
                    opened: '1129',
                    closed: '1083'
                  },
                  {
                    manager: 'Rita Patel',
                    opened: '1539',
                    closed: '1265'
                  }
                ]}
              />
            </Fragment>
          )
        }
      ]}
    />
  )
};

export const Standard: Story = {
  args: {},
  render: ({ ...props }) => (
    <Tabs
      {...props}
      items={[
        {
          label: 'Past day',
          id: 'past-day',
          content: (
            <Fragment>
              <h2>Past day</h2>
              <Table
                keys={['manager', 'opened', 'closed']}
                headings={{
                  manager: 'Case manager',
                  opened: 'Cases opened',
                  closed: 'Cases closed'
                }}
                data={[
                  {
                    manager: 'David Francis',
                    opened: '3',
                    closed: '0'
                  },
                  {
                    manager: 'Paul Farmer',
                    opened: '1',
                    closed: '0'
                  },
                  {
                    manager: 'Rita Patel',
                    opened: '2',
                    closed: '0'
                  }
                ]}
              />
            </Fragment>
          )
        },
        {
          label: 'Past week',
          id: 'past-week',
          content: (
            <Fragment>
              <h2>Past week</h2>
              <Table
                keys={['manager', 'opened', 'closed']}
                headings={{
                  manager: 'Case manager',
                  opened: 'Cases opened',
                  closed: 'Cases closed'
                }}
                data={[
                  {
                    manager: 'David Francis',
                    opened: '24',
                    closed: '18'
                  },
                  {
                    manager: 'Paul Farmer',
                    opened: '16',
                    closed: '20'
                  },
                  {
                    manager: 'Rita Patel',
                    opened: '24',
                    closed: '27'
                  }
                ]}
              />
            </Fragment>
          )
        },
        {
          label: 'Past month',
          id: 'past-month',
          content: (
            <Fragment>
              <h2>Past month</h2>
              <Table
                keys={['manager', 'opened', 'closed']}
                headings={{
                  manager: 'Case manager',
                  opened: 'Cases opened',
                  closed: 'Cases closed'
                }}
                data={[
                  {
                    manager: 'David Francis',
                    opened: '98',
                    closed: '95'
                  },
                  {
                    manager: 'Paul Farmer',
                    opened: '122',
                    closed: '131'
                  },
                  {
                    manager: 'Rita Patel',
                    opened: '126',
                    closed: '142'
                  }
                ]}
              />
            </Fragment>
          )
        },
        {
          label: 'Past year',
          id: 'past-year',
          content: (
            <Fragment>
              <h2>Past year</h2>
              <Table
                keys={['manager', 'opened', 'closed']}
                headings={{
                  manager: 'Case manager',
                  opened: 'Cases opened',
                  closed: 'Cases closed'
                }}
                data={[
                  {
                    manager: 'David Francis',
                    opened: '1380',
                    closed: '1472'
                  },
                  {
                    manager: 'Paul Farmer',
                    opened: '1129',
                    closed: '1083'
                  },
                  {
                    manager: 'Rita Patel',
                    opened: '1539',
                    closed: '1265'
                  }
                ]}
              />
            </Fragment>
          )
        }
      ]}
    />
  )
};
