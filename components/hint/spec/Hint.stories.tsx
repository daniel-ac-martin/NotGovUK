import type { Meta, StoryObj } from '@storybook/react-vite';

import { Hint } from '../src/Hint';

const meta = {
  title: 'Internal/Hint',
  parameters: {
    chromatic: {
      viewports: [640, 480]
    },
    description: 'Hint text for a form field.'
  },
  component: Hint,
  args: { id: 'field-id2-hint', children: 'Hint text' }
} satisfies Meta<typeof Hint>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { id: 'field-id-hint' }
};

export const Standard: Story = {
  args: {}
};
