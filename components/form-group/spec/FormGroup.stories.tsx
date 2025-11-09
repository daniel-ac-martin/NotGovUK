import type { Meta, StoryObj } from '@storybook/react-vite';

import { FormGroup } from '../src/FormGroup';

const meta = {
  title: 'Internal/Form group',
  parameters: {
    chromatic: {
      viewports: [640, 480]
    },
    description: 'A group of form fields.'
  },
  component: FormGroup,
  args: { hint: 'Enter your date of birth', id: 'dob', label: 'Birthday' }
} satisfies Meta<typeof FormGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: ({ ...props }) => (
    <FormGroup {...props}>
      <p>Content</p>
    </FormGroup>
  )
};

export const Standard: Story = {
  args: {},
  render: ({ ...props }) => (
    <FormGroup {...props}>
      <p>Content</p>
    </FormGroup>
  )
};

export const Label: Story = {
  args: {
    hint: 'Enter your name',
    id: 'name',
    label: 'Name',
    fieldId: 'name-input'
  },
  render: ({ ...props }) => (
    <FormGroup {...props}>
      <p>Content</p>
    </FormGroup>
  )
};

export const Error: Story = {
  args: { error: 'Enter a date in the past' },
  render: ({ ...props }) => (
    <FormGroup {...props}>
      <p>Content</p>
    </FormGroup>
  )
};
