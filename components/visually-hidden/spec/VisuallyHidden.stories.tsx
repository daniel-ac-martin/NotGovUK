import type { Meta, StoryObj } from '@storybook/react-vite';

import { VisuallyHidden } from '../src/VisuallyHidden';

const meta = {
  title: 'Internal/Visually hidden',
  parameters: {
    chromatic: {
      viewports: [640, 480]
    },
    description:
      'Invisible text that can be read by software such as screen-readers.'
  },
  component: VisuallyHidden,
  args: { children: 'Error:' }
} satisfies Meta<typeof VisuallyHidden>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: ({ ...props }) => (
    <p>
      <VisuallyHidden {...props} /> Something went wrong
    </p>
  )
};

export const Standard: Story = {
  args: {},
  render: ({ ...props }) => (
    <p>
      <VisuallyHidden {...props} /> Something went wrong
    </p>
  )
};
