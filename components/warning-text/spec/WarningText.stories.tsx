import type { Meta, StoryObj } from '@storybook/react-vite';

import { WarningText } from '../src/WarningText';

const meta = {
  title: 'Warning text',
  parameters: {
    chromatic: {
      viewports: [640, 480]
    },
    description: 'A component to warn the user of something important.'
  },
  component: WarningText,
  args: {}
} satisfies Meta<typeof WarningText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: ({ ...props }) => (
    <WarningText {...props}>
      <p>You can be fined up to £5,000 if you do not register.</p>
    </WarningText>
  )
};

export const Standard: Story = {
  args: {},
  render: ({ ...props }) => (
    <WarningText {...props}>
      <p>You can be fined up to £5,000 if you do not register.</p>
    </WarningText>
  )
};

export const CustomAssistive: Story = {
  args: { iconFallbackText: 'Caution' },
  render: ({ ...props }) => (
    <WarningText {...props}>
      <p>Floors may be slippery when wet.</p>
    </WarningText>
  )
};
