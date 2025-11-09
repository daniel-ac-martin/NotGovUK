import type { Meta, StoryObj } from '@storybook/react-vite';

import { ErrorMessage } from '../src/ErrorMessage';

const meta = {
  title: 'Error message',
  parameters: {
    chromatic: {
      viewports: [640, 480]
    },
    description: 'An error message associated with a form field.'
  },
  component: ErrorMessage,
  args: { children: 'The date your passport was issued must be in the past' }
} satisfies Meta<typeof ErrorMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: ({ ...props }) => (
    <>
      <ErrorMessage {...props} />
    </>
  )
};

export const Standard: Story = {
  args: {}
};

export const Legend: Story = {
  args: {
    children:
      'Select if you are British, Irish or a citizen of a different country'
  },
  render: ({ ...props }) => (
    <>
      <ErrorMessage {...props} />
    </>
  )
};

export const Label: Story = {
  args: { children: 'Enter a National Insurance number in the correct format' },
  render: ({ ...props }) => (
    <>
      <ErrorMessage {...props} />
    </>
  )
};
