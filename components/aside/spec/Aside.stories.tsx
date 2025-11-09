import type { Meta, StoryObj } from '@storybook/react-vite';

import { Aside } from '../src/Aside';

const meta = {
  title: 'Unofficial/Aside',
  component: Aside,
  parameters: {
    chromatic: { viewports: [640, 480] },
    description: 'A component for displaying indirectly related content.',
    image: 'https://snapshots.chromatic.com/snapshots/5f1488148c817700223adb9a-5ff08dbae29b2700217b5333/capture.png',
  },
  args: {
    heading: 'Did you know?',
    body: 'You can put indirectly related content in an Aside component.',
  },
  render: ({ heading, body, ...args }) => (
    <Aside {...args}>
      <h2>{heading}</h2>
      <p>{body}</p>
    </Aside>
  )
} satisfies Meta<typeof Aside>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {}
};
