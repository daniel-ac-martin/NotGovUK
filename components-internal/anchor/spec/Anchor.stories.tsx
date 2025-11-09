import type { Meta, StoryObj } from '@storybook/react-vite';

import { A } from '../src/Anchor';

const meta = {
  title: 'Base/Anchor',
  parameters: {},
  component: A,
  args: { href: '#', children: 'Text' }
} satisfies Meta<typeof A>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Anchor: Story = {
  args: {}
};

export const Standard: Story = {
  args: {}
};

export const WithTitle: Story = {
  args: { children: 'Link with title', title: 'Hello' },
  name: 'With title'
};
