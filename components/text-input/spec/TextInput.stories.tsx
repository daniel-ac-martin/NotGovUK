import type { Meta, StoryObj } from '@storybook/react-vite';

import { TextInput } from '../src/TextInput';

const meta = {
  title: 'Text input',
  parameters: {
    chromatic: {
      viewports: [640, 480]
    },
    description: 'A single line text field.'
  },
  component: TextInput,
  args: { name: 'event-name' }
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: ({ ...props }) => (
    <TextInput
      {...props}
      label={
        <h1 className="govuk-heading-l">What is the name of the event?</h1>
      }
    />
  )
};

export const Standard: Story = {
  args: {},
  render: ({ ...props }) => (
    <TextInput
      {...props}
      label={
        <h1 className="govuk-heading-l">What is the name of the event?</h1>
      }
    />
  )
};

export const NoHeading: Story = {
  args: { label: 'What is the name of the event?' },
  name: 'No heading'
};

export const FixedWidth: Story = {
  args: { name: 'width-20', label: '20 character width', width: '20' },
  render: ({ ...props }) => (
    <>
      <TextInput {...props} />
      <TextInput label="10 character width" name="width-10" width="10" />
      <TextInput label="5 character width" name="width-5" width="5" />
      <TextInput label="4 character width" name="width-4" width="4" />
      <TextInput label="3 character width" name="width-3" width="3" />
      <TextInput label="2 character width" name="width-2" width="2" />
    </>
  ),
  name: 'Fixed width'
};

export const FluidWidth: Story = {
  args: { name: 'full', label: 'Full width', className: 'govuk-!-width-full' },
  render: ({ ...props }) => (
    <>
      <TextInput {...props} />
      <TextInput
        label="Three-quarters width"
        name="three-quarters"
        className="govuk-!-width-three-quarters"
      />
      <TextInput
        label="Two-thirds width"
        name="two-thirds"
        className="govuk-!-width-two-thirds"
      />
      <TextInput
        label="One-half width"
        name="one-half"
        className="govuk-!-width-one-half"
      />
      <TextInput
        label="One-third width"
        name="one-third"
        className="govuk-!-width-one-third"
      />
      <TextInput
        label="One-quarter width"
        name="one-quarter"
        className="govuk-!-width-one-quarter"
      />
    </>
  ),
  name: 'Fluid width'
};

export const Hints: Story = {
  args: { hint: 'The name you’ll use on promotional material.' },
  render: ({ ...props }) => (
    <TextInput
      {...props}
      label={
        <h1 className="govuk-heading-l">What is the name of the event?</h1>
      }
    />
  )
};

export const WholeNumbers: Story = {
  args: {
    name: 'account-number',
    hint: 'Must be between 6 and 8 digits long',
    inputMode: 'numeric',
    pattern: '[0-9]*',
    width: 10
  },
  render: ({ ...props }) => (
    <TextInput
      {...props}
      label={<h1 className="govuk-heading-l">What is your account number?</h1>}
    />
  ),
  name: 'Whole numbers'
};

export const DecimalNumbers: Story = {
  args: {
    name: 'weight',
    label: 'Weight, in kilograms',
    width: 5,
    suffix: 'kg'
  },
  name: 'Decimal numbers'
};

export const PrefixAndSuffix: Story = {
  args: {
    name: 'cost-per-item',
    width: 5,
    prefix: '£',
    suffix: 'per item'
  },
  render: ({ ...props }) => (
    <TextInput
      {...props}
      label={
        <h1 className="govuk-heading-l">
          What is the cost per item, in pounds?
        </h1>
      }
    />
  ),
  name: 'Prefix and suffix'
};

export const Prefix: Story = {
  args: { name: 'cost', width: 5, prefix: '£' },
  render: ({ ...props }) => (
    <TextInput
      {...props}
      label={<h1 className="govuk-heading-l">What is the cost in pounds?</h1>}
    />
  )
};

export const Suffix: Story = {
  args: { name: 'weight', width: 5, suffix: 'kg' },
  render: ({ ...props }) => (
    <TextInput
      {...props}
      label={
        <h1 className="govuk-heading-l">What is the weight in kilograms?</h1>
      }
    />
  )
};

export const Autocomplete: Story = {
  args: {
    name: 'postcode',
    label: 'Postcode',
    width: '10',
    autoComplete: 'postal-code'
  },
  name: 'Auto-complete'
};

export const NoSpellcheck: Story = {
  args: { name: 'name', label: 'Name', spellCheck: false },
  name: 'No spellcheck'
};

export const Spellcheck: Story = {
  args: { name: 'description', label: 'Description', spellCheck: true }
};

export const Errors: Story = {
  args: {
    hint: 'The name you’ll use on promotional material.',
    error: 'Enter an event name'
  },
  render: ({ ...props }) => (
    <TextInput
      {...props}
      label={
        <h1 className="govuk-heading-l">What is the name of the event?</h1>
      }
    />
  )
};

export const ErrorsWithPrefixAndSuffix: Story = {
  args: {
    name: 'cost-per-item',
    width: 5,
    prefix: '£',
    suffix: 'per item',
    error: 'Enter a cost per item, in pounds'
  },
  render: ({ ...props }) => (
    <TextInput
      {...props}
      label={
        <h1 className="govuk-heading-l">
          What is the cost per item, in pounds?
        </h1>
      }
    />
  ),
  name: 'Errors with prefix and suffix'
};
