import type { Meta, StoryObj } from '@storybook/react-vite';

import { Tag } from '@not-govuk/tag';
import { TaskList } from '../src/TaskList';

const meta = {
  title: 'Task list',
  parameters: {
    chromatic: {
      viewports: [640, 480]
    },
    description:
      'A component to show all the tasks a user needs to do, and allow them to easily identify which ones are done and which they still need to do.'
  },
  component: TaskList,
  args: {
    items: []
  }
} satisfies Meta<typeof TaskList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    idPrefix: 'company-details',
    items: [
      {
        title: 'Company Directors',
        href: '#',
        status: 'Completed'
      },
      {
        title: 'Registered company details',
        href: '#',
        status: <Tag classModifiers="blue">Incomplete</Tag>
      },
      {
        title: 'Financial history',
        href: '#',
        hint: 'Include 5 years of the company’s relevant financial information',
        status: <Tag classModifiers="blue">Incomplete</Tag>
      },
      {
        title: 'Business plan',
        href: '#',
        status: <Tag classModifiers="blue">Incomplete</Tag>
      },
      {
        title: 'References',
        href: '#',
        status: <Tag classModifiers="blue">Incomplete</Tag>
      }
    ]
  }
};

export const Statuses: Story = {
  args: {
    items: [
      {
        title: 'Company Directors',
        href: '#',
        status: 'Completed'
      },
      {
        title: 'Registered company details',
        href: '#',
        status: <Tag classModifiers="teal">Not started</Tag>
      },
      {
        title: 'Business plan',
        href: '#',
        hint: 'Ensure the plan covers objectives, strategies, sales, marketing and financial forecasts.',
        status: <Tag classModifiers="magenta">Review</Tag>
      },
      {
        title: 'Documentation',
        href: '#',
        status: <Tag classModifiers="blue">In progress</Tag>
      },
      {
        title: 'Charitable status',
        href: '#',
        status: <Tag classModifiers="red">Error</Tag>
      },
      {
        title: 'Payment',
        hint: 'It will cost between £15 and £75',
        status: 'Cannot start yet',
        statusClassModifiers: 'cannot-start-yet'
      }
    ]
  }
};

export const Grouped: Story = {
  args: {},
  render: () => (
    <>
      <h2 className="govuk-heading-m">Check before you start</h2>
      <TaskList
        idPrefix="before-you-start"
        items={[
          {
            title: 'Check eligibility',
            href: '#',
            status: 'Completed'
          },
          {
            title: 'Read declaration',
            href: '#',
            status: <Tag classModifiers="blue">Incomplete</Tag>
          }
        ]}
      />
      <h2 className="govuk-heading-m govuk-!-margin-top-5">Prepare application</h2>
      <TaskList
        idPrefix="prepare-application"
        items={[
          {
            title: 'Company information',
            href: '#',
            status: 'Completed'
          },
          {
            title: 'Your contact details',
            href: '#',
            status: <Tag classModifiers="blue">Incomplete</Tag>
          },
          {
            title: 'List convictions',
            href: '#',
            status: 'Completed'
          },
          {
            title: 'Provide financial evidence',
            href: '#',
            status: <Tag classModifiers="blue">Incomplete</Tag>
          },
          {
            title: 'Give medical information',
            href: '#',
            status: <Tag classModifiers="blue">Incomplete</Tag>
          }
        ]}
      />
    </>
  ),
  name: 'Grouped tasks'
};
