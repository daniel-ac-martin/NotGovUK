import type { Meta, StoryObj } from '@storybook/react-vite';

import { Label } from '../src/Label';

const meta = {
  title: 'Internal/Label',
  parameters: {
    chromatic: {
      viewports: [640, 480]
    },
    description: 'A label for a form field.'
  },
  component: Label,
  args: { htmlFor: 'my-field2', children: 'My label' }
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { htmlFor: 'my-field' },
  render: ({ ...props }) => (
    <form action="#" method="get">
      <Label {...props} />
      <input type="text" id="my-field" name="my-field" />
    </form>
  )
};

export const Standard: Story = {
  args: {},
  render: ({ ...props }) => (
    <form action="#" method="get">
      <Label {...props} />
      <input type="text" id="my-field2" name="my-field" />
    </form>
  )
};

export const Inline: Story = {
  args: { htmlFor: undefined, children: null },
  render: ({ ...props }) => (
    <form action="#" method="get">
      <Label {...props}>
        My label
        <input type="text" name="my-field" />
      </Label>
    </form>
  ),
  name: 'In-line'
};
