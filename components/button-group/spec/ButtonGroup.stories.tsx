import type { Meta, StoryObj } from '@storybook/react-vite';

import { A } from '@not-govuk/link';
import { ButtonGroup } from '../src/ButtonGroup';

const meta = {
  title: 'Internal/Button group',
  parameters: {
    chromatic: {
      viewports: [640, 480]
    },
    description: 'A component for grouping buttons and links on a single line.'
  },
  component: ButtonGroup,
  args: {}
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: ({ ...props }) => (
    <ButtonGroup {...props}>
      <A href="#">One</A>
      <A href="#">Two</A>
      <A href="#">Three</A>
    </ButtonGroup>
  )
};

export const Standard: Story = {
  args: {},
  render: ({ ...props }) => (
    <ButtonGroup {...props}>
      <A href="#">One</A>
      <A href="#">Two</A>
      <A href="#">Three</A>
    </ButtonGroup>
  )
};
