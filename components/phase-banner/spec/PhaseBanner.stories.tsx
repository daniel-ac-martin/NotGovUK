import type { Meta, StoryObj } from '@storybook/react-vite';

import { PhaseBanner } from '../src/PhaseBanner';

const meta = {
  title: 'Phase banner',
  parameters: {
    chromatic: {
      viewports: [640, 480]
    },
    description:
      'A component to show users your service is still being worked on.'
  },
  component: PhaseBanner,
  args: { phase: 'Alpha' }
} satisfies Meta<typeof PhaseBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: ({ ...props }) => (
    <PhaseBanner {...props}>
      This is a new service \u2013 your <a href="#">feedback</a> will help us to
      improve it.
    </PhaseBanner>
  )
};

export const Alpha: Story = {
  args: {},
  render: ({ ...props }) => (
    <PhaseBanner {...props}>
      This is a new service \u2013 your <a href="#">feedback</a> will help us to
      improve it.
    </PhaseBanner>
  )
};

export const Beta: Story = {
  args: { phase: 'Beta' },
  render: ({ ...props }) => (
    <PhaseBanner {...props}>
      This is a new service \u2013 your <a href="#">feedback</a> will help us to
      improve it.
    </PhaseBanner>
  )
};

export const Prototype: Story = {
  args: { phase: 'Prototype' },
  render: ({ ...props }) => (
    <PhaseBanner {...props}>
      This is <strong>NOT</strong> a real service!
    </PhaseBanner>
  )
};
