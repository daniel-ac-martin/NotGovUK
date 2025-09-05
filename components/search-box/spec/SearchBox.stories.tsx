import type { Meta, StoryObj } from '@storybook/react-vite';

import { SearchBox } from '../src/SearchBox';

const meta = {
  title: 'Unofficial/Search box',
  parameters: {
    chromatic: {
      viewports: [640, 480]
    },
    description: 'A single-line, form field for searching, with submit button.'
  },
  component: SearchBox,
  args: { name: 'q' }
} satisfies Meta<typeof SearchBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { label: 'Search Google', width: 15 },
  render: ({ ...props }) => (
    <form method="get" action="https://www.google.co.uk/search">
      <SearchBox {...props} />
    </form>
  )
};

export const Standard: Story = {
  args: {}
};

export const CustomLabel: Story = {
  args: { label: 'Query' },
  name: 'Custom label'
};

export const Hint: Story = {
  args: { hint: 'What are you looking for?' }
};

export const CustomButton: Story = {
  args: { button: 'Query' },
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

export const Secondary: Story = {
  args: { classModifiers: 'secondary' }
};
