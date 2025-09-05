import type { Meta, StoryObj } from '@storybook/react-vite';

import { FormField } from '../src/FormField';

const meta = {
  title: 'Unofficial/Form field',
  parameters: {
    chromatic: {
      viewports: [640, 480]
    },
    description: 'A component for colecting a piece of data from the user.'
  },
  component: FormField,
  args: {
    name: 'name',
    hint: 'The name you’ll use on promotional material.'
  }
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: ({ ...props }) => (
    <FormField
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
    <FormField
      {...props}
      label={
        <h1 className="govuk-heading-l">What is the name of the event?</h1>
      }
    />
  )
};

export const Multiline: Story = {
  args: {
    name: 'desc',
    hint: 'This will be displayed on promotional material.',
    rows: 3
  },
  render: ({ ...props }) => (
    <FormField
      {...props}
      label={
        <h1 className="govuk-heading-l">How would you describe the event?</h1>
      }
    />
  ),
  name: 'Multi-line'
};

export const Date: Story = {
  args: { name: 'date', hint: undefined, type: 'date' },
  render: ({ ...props }) => (
    <FormField
      {...props}
      label={<h1 className="govuk-heading-l">When is the event?</h1>}
    />
  )
};

export const Datepicker: Story = {
  args: { name: 'date', hint: undefined, type: 'native-date' },
  render: ({ ...props }) => (
    <FormField
      {...props}
      label={<h1 className="govuk-heading-l">When is the event?</h1>}
    />
  ),
  name: 'Date-picker'
};

export const Singlechoicefew: Story = {
  args: {
    name: 'age-restricted',
    hint: "Select 'No' if there will be any explicit content.",
    classModifiers: 'inline'
  },
  render: ({ ...props }) => (
    <FormField
      {...props}
      label={<h1 className="govuk-heading-l">Is it suitable for under-18s?</h1>}
      options={[
        {
          value: '1',
          label: 'Yes'
        },
        {
          value: '0',
          label: 'No'
        }
      ]}
    />
  ),
  name: 'Single-choice-few'
};

export const Singlechoicesome: Story = {
  args: {
    name: 'location',
    hint: 'Select the country in which the event will be held.'
  },
  render: ({ ...props }) => (
    <FormField
      {...props}
      label={
        <h1 className="govuk-heading-l">Where will the event take place?</h1>
      }
      options={[
        {
          value: 'fr',
          label: 'France'
        },
        {
          value: 'de',
          label: 'Germany'
        },
        {
          value: 'ie',
          label: 'Republic of Ireland'
        },
        {
          value: 'pt',
          label: 'Portugal'
        },
        {
          value: 'es',
          label: 'Spain'
        },
        {
          value: 'nl',
          label: 'The Netherlands'
        },
        {
          value: 'gb',
          label: 'United Kingdom',
          selected: true
        }
      ]}
    />
  ),
  name: 'Single-choice-some'
};

export const Singlechoicemany: Story = {
  args: {
    name: 'location',
    hint: 'Select the country in which the event will be held.'
  },
  render: ({ ...props }) => (
    <FormField
      {...props}
      label={
        <h1 className="govuk-heading-l">Where will the event take place?</h1>
      }
      options={[
        {
          value: 'bg',
          label: 'Bulgaria'
        },
        {
          value: 'cz',
          label: 'Czech Republic'
        },
        {
          value: 'fr',
          label: 'France'
        },
        {
          value: 'de',
          label: 'Germany'
        },
        {
          value: 'fi',
          label: 'Finland'
        },
        {
          value: 'hu',
          label: 'Hungary'
        },
        {
          value: 'it',
          label: 'Italy'
        },
        {
          value: 'ie',
          label: 'Republic of Ireland'
        },
        {
          value: 'ro',
          label: 'Romania'
        },
        {
          value: 'no',
          label: 'Norway'
        },
        {
          value: 'pl',
          label: 'Poland'
        },
        {
          value: 'pt',
          label: 'Portugal'
        },
        {
          value: 'ru',
          label: 'Russia'
        },
        {
          value: 'sk',
          label: 'Slovakia'
        },
        {
          value: 'si',
          label: 'Slovenia'
        },
        {
          value: 'es',
          label: 'Spain'
        },
        {
          value: 'se',
          label: 'Sweden'
        },
        {
          value: 'ch',
          label: 'Switzerland'
        },
        {
          value: 'nl',
          label: 'The Netherlands'
        },
        {
          value: 'ua',
          label: 'Ukraine'
        },
        {
          value: 'gb',
          label: 'United Kingdom',
          selected: true
        }
      ]}
    />
  ),
  name: 'Single-choice-many'
};

export const Multiplechoicesome: Story = {
  args: {
    name: 'location',
    hint: 'Select all countries that will be hosting the event.',
    multiple: true
  },
  render: ({ ...props }) => (
    <FormField
      {...props}
      label={
        <h1 className="govuk-heading-l">Where will the event take place?</h1>
      }
      options={[
        {
          value: 'fr',
          label: 'France'
        },
        {
          value: 'de',
          label: 'Germany'
        },
        {
          value: 'ie',
          label: 'Republic of Ireland'
        },
        {
          value: 'pt',
          label: 'Portugal'
        },
        {
          value: 'es',
          label: 'Spain'
        },
        {
          value: 'nl',
          label: 'The Netherlands'
        },
        {
          value: 'gb',
          label: 'United Kingdom',
          selected: true
        }
      ]}
    />
  ),
  name: 'Multiple-choice-some'
};

export const Multiplechoicemany: Story = {
  args: {
    name: 'location',
    hint: 'Select all countries that will be hosting the event.',
    multiple: true,
    size: 8
  },
  render: ({ ...props }) => (
    <FormField
      {...props}
      label={
        <h1 className="govuk-heading-l">Where will the event take place?</h1>
      }
      options={[
        {
          value: 'bg',
          label: 'Bulgaria'
        },
        {
          value: 'cz',
          label: 'Czech Republic'
        },
        {
          value: 'fr',
          label: 'France'
        },
        {
          value: 'de',
          label: 'Germany'
        },
        {
          value: 'fi',
          label: 'Finland'
        },
        {
          value: 'hu',
          label: 'Hungary'
        },
        {
          value: 'it',
          label: 'Italy'
        },
        {
          value: 'ie',
          label: 'Republic of Ireland'
        },
        {
          value: 'ro',
          label: 'Romania'
        },
        {
          value: 'no',
          label: 'Norway'
        },
        {
          value: 'pl',
          label: 'Poland'
        },
        {
          value: 'pt',
          label: 'Portugal'
        },
        {
          value: 'ru',
          label: 'Russia'
        },
        {
          value: 'sk',
          label: 'Slovakia'
        },
        {
          value: 'si',
          label: 'Slovenia'
        },
        {
          value: 'es',
          label: 'Spain'
        },
        {
          value: 'se',
          label: 'Sweden'
        },
        {
          value: 'ch',
          label: 'Switzerland'
        },
        {
          value: 'nl',
          label: 'The Netherlands'
        },
        {
          value: 'ua',
          label: 'Ukraine'
        },
        {
          value: 'gb',
          label: 'United Kingdom',
          selected: true
        }
      ]}
    />
  ),
  name: 'Multiple-choice-many'
};
