import type { Meta, StoryObj } from '@storybook/react-vite';

import { Tabs } from '../src/Tabs';

const meta = {
  title: 'Base/Tabs',
  parameters: {
    chromatic: {
      viewports: [640, 480]
    },
    description: 'A component for multiple, related sections of content.'
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
          id: 'a1',
          label: 'AAA',
          content: <p>A</p>
        },
        {
          id: 'b1',
          label: 'BBB',
          content: <p>B</p>
        },
        {
          id: 'c1',
          label: 'CCC',
          content: <p>C</p>
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
          id: 'a2',
          label: 'AAA',
          content: <p>A</p>
        },
        {
          id: 'b2',
          label: 'BBB',
          content: <p>B</p>
        },
        {
          id: 'c2',
          label: 'CCC',
          content: <p>C</p>
        }
      ]}
    />
  )
};
