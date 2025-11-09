import type { Meta, StoryObj } from '@storybook/react-vite';

import { Select } from '../src/Select';

const meta = {
  title: 'Select',
  parameters: {
    chromatic: {
      viewports: [640, 480]
    },
    description: 'A component to allow users to choose from many options.'
  },
  component: Select,
  args: { label: 'Sort by', name: 'sort' }
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: ({ ...props }) => (
    <Select
      {...props}
      options={[
        {
          value: 'published',
          label: 'Recently published'
        },
        {
          value: 'updated',
          label: 'Recently updated',
          selected: true
        },
        {
          value: 'views',
          label: 'Most views'
        },
        {
          value: 'comments',
          label: 'Most comments'
        }
      ]}
    />
  )
};

export const Standard: Story = {
  args: {},
  render: ({ ...props }) => (
    <Select
      {...props}
      options={[
        {
          value: 'published',
          label: 'Recently published'
        },
        {
          value: 'updated',
          label: 'Recently updated',
          selected: true
        },
        {
          value: 'views',
          label: 'Most views'
        },
        {
          value: 'comments',
          label: 'Most comments'
        }
      ]}
    />
  )
};
