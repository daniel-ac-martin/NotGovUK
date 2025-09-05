import type { Meta, StoryObj } from '@storybook/react-vite';

import { StandaloneInput } from '../src/StandaloneInput';

const meta = {
  title: 'Unofficial/Standalone input',
  parameters: {
    chromatic: {
      viewports: [640, 480]
    },
    description: 'A single-line, form field with a submit button.'
  },
  component: StandaloneInput,
  args: { name: 'message', label: 'Message' }
} satisfies Meta<typeof StandaloneInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { label: 'Your message', button: 'Send' }
};

export const Standard: Story = {
  args: {}
};

export const Hint: Story = {
  args: { hint: 'What do you want to say?' }
};

export const CustomButton: Story = {
  args: { button: 'Send' },
  name: 'Custom button'
};

export const FixedWidth: Story = {
  args: { width: '10' },
  name: 'Fixed width'
};

export const FluidWidth: Story = {
  args: { className: 'govuk-!-width-one-half' },
  name: 'Fluid width'
};

export const Error: Story = {
  args: { error: 'Something went wrong' }
};

export const Disabled: Story = {
  args: { disabled: true }
};
