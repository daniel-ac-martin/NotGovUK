import type { Meta, StoryObj } from '@storybook/react-vite';

import { Textarea } from '../src/Textarea';

const meta = {
  title: 'Textarea',
  parameters: {
    chromatic: {
      viewports: [640, 480]
    },
    description: 'A component to allow users to enter multiple lines of text.'
  },
  component: Textarea,
  args: {
    hint: 'Do not include personal or financial information, like your National Insurance number or credit card details.',
    name: 'more-detail'
  }
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: ({ ...props }) => (
    <Textarea
      {...props}
      label={<h1 className="govuk-heading-l">Can you provide more detail?</h1>}
    />
  )
};

export const Standard: Story = {
  args: {},
  render: ({ ...props }) => (
    <Textarea
      {...props}
      label={<h1 className="govuk-heading-l">Can you provide more detail?</h1>}
    />
  )
};

export const Sized: Story = {
  args: { rows: '8' },
  render: ({ ...props }) => (
    <Textarea
      {...props}
      label={<h1 className="govuk-heading-l">Can you provide more detail?</h1>}
    />
  )
};

export const NoHeading: Story = {
  args: { hint: undefined, label: 'Can you provide more detail?' },
  name: 'No heading'
};

export const Errors: Story = {
  args: { error: 'Enter more detail' },
  render: ({ ...props }) => (
    <Textarea
      {...props}
      label={<h1 className="govuk-heading-l">Can you provide more detail?</h1>}
    />
  )
};
