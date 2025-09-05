import type { Meta, StoryObj } from '@storybook/react-vite';

import { DateInput } from '../src/DateInput';

const meta = {
  title: 'Date input',
  parameters: {
    chromatic: {
      viewports: [640, 480]
    },
    description: 'A component to allow users to enter a date.'
  },
  component: DateInput,
  args: { name: 'passport-issued', hint: 'For example, 12 11 2007' }
} satisfies Meta<typeof DateInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: ({ ...props }) => (
    <DateInput
      {...props}
      label={
        <h1 className="govuk-heading-l">When was your passport issued?</h1>
      }
    />
  )
};

export const Standard: Story = {
  args: {},
  render: ({ ...props }) => (
    <DateInput
      {...props}
      label={
        <h1 className="govuk-heading-l">When was your passport issued?</h1>
      }
    />
  )
};

export const NoHeading: Story = {
  args: { label: 'When was your passport issued?' },
  name: 'No heading'
};

export const Autocomplete: Story = {
  args: { name: 'dob', hint: 'For example, 31 3 1980', autoComplete: 'bday' },
  render: ({ ...props }) => (
    <DateInput
      {...props}
      label={<h1 className="govuk-heading-l">What is your date of birth?</h1>}
    />
  ),
  name: 'Auto-complete'
};

export const Errors: Story = {
  args: { error: 'The date your passport was issued must be in the past' },
  render: ({ ...props }) => (
    <DateInput
      {...props}
      label={
        <h1 className="govuk-heading-l">When was your passport issued?</h1>
      }
    />
  )
};

export const SubErrors: Story = {
  args: {},
  render: ({ ...props }) => (
    <DateInput
      {...props}
      label={
        <h1 className="govuk-heading-l">When was your passport issued?</h1>
      }
      error={{
        year: 'The date your passport was issued must include a year'
      }}
    />
  )
};
