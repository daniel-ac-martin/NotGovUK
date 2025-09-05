import type { Meta, StoryObj } from '@storybook/react-vite';

import { Panel } from '@not-govuk/panel';
import { WidthContainer } from '../src/WidthContainer';

const meta = {
  title: 'Internal/Width container',
  parameters: {
    chromatic: {
      viewports: [640, 480]
    },
    description: 'A simple container to limit the width of its contents.'
  },
  component: WidthContainer,
  args: {}
} satisfies Meta<typeof WidthContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { maxWidth: 300 },
  render: ({ ...props }) => (
    <WidthContainer {...props}>
      <Panel classModifiers="confirmation" title="Contents" />
    </WidthContainer>
  )
};

export const Standard: Story = {
  args: {},
  render: ({ ...props }) => (
    <WidthContainer {...props}>
      <Panel classModifiers="confirmation" title="Contents" />
    </WidthContainer>
  )
};

export const Custom: Story = {
  args: { maxWidth: 300 },
  render: ({ ...props }) => (
    <WidthContainer {...props}>
      <Panel classModifiers="confirmation" title="Contents" />
    </WidthContainer>
  )
};

export const Full: Story = {
  args: { maxWidth: -1 },
  render: ({ ...props }) => (
    <WidthContainer {...props}>
      <Panel classModifiers="confirmation" title="Contents" />
    </WidthContainer>
  )
};
