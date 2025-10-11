import type { Meta, StoryObj } from '@storybook/react-vite';

import { TextInput } from '@not-govuk/text-input';
import { Checkboxes } from '../src/Checkboxes';

const meta = {
  title: 'Checkboxes',
  parameters: {
    chromatic: {
      viewports: [640, 480]
    },
    description: 'A component to allow users to select one or more options.'
  },
  component: Checkboxes,
  args: { name: 'waste', hint: 'Select all that apply.' }
} satisfies Meta<typeof Checkboxes>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: ({ ...props }) => (
    <Checkboxes
      {...props}
      label={
        <h1 className="govuk-heading-l">
          Which types of waste do you transport?
        </h1>
      }
      options={[
        {
          value: 'carcasses',
          label: 'Waste from animal carcasses'
        },
        {
          value: 'mines',
          label: 'Waste from mines or quarries'
        },
        {
          value: 'farm',
          label: 'Farm or agricultural waste'
        }
      ]}
    />
  )
};

export const Standard: Story = {
  args: {},
  render: ({ ...props }) => (
    <Checkboxes
      {...props}
      label={
        <h1 className="govuk-heading-l">
          Which types of waste do you transport?
        </h1>
      }
      options={[
        {
          value: 'carcasses',
          label: 'Waste from animal carcasses'
        },
        {
          value: 'mines',
          label: 'Waste from mines or quarries'
        },
        {
          value: 'farm',
          label: 'Farm or agricultural waste'
        }
      ]}
    />
  )
};

export const NoHeading: Story = {
  args: { label: 'Which types of waste do you transport?' },
  render: ({ ...props }) => (
    <Checkboxes
      {...props}
      options={[
        {
          value: 'carcasses',
          label: 'Waste from animal carcasses'
        },
        {
          value: 'mines',
          label: 'Waste from mines or quarries'
        },
        {
          value: 'farm',
          label: 'Farm or agricultural waste'
        }
      ]}
    />
  ),
  name: 'No heading'
};

export const Hints: Story = {
  args: {
    name: 'nationality',
    hint: 'If you have dual nationality, select all options that are relevant to you.'
  },
  render: ({ ...props }) => (
    <Checkboxes
      {...props}
      label={<h1 className="govuk-heading-l">What is your nationality?</h1>}
      options={[
        {
          value: 'british',
          label: 'British',
          hint: 'including English, Scottish, Welsh and Northern Irish'
        },
        {
          value: 'irish',
          label: 'Irish'
        },
        {
          value: 'other',
          label: 'Citizen of another country'
        }
      ]}
    />
  )
};

export const None: Story = {
  args: { name: 'contact', hint: 'Select all countries that apply' },
  render: ({ ...props }) => (
    <Checkboxes
      {...props}
      label={
        <h1 className="govuk-heading-l">
          Will you be travelling to any of these countries?
        </h1>
      }
      options={[
        {
          value: 'france',
          label: 'France'
        },
        {
          value: 'portugal',
          label: 'Portugal'
        },
        {
          value: 'spain',
          label: 'Spain'
        },
        'or',
        {
          value: 'none',
          label: 'No, I will not be travelling to any of these countries'
        }
      ]}
    />
  )
};

export const NoneError: Story = {
  args: {
    name: 'contact',
    hint: undefined,
    error:
      'Select countries you will be travelling to, or select “No, I will not be travelling to any of these countries”'
  },
  render: ({ ...props }) => (
    <Checkboxes
      {...props}
      label={
        <h1 className="govuk-heading-l">
          Will you be travelling to any of these countries?
        </h1>
      }
      options={[
        {
          value: 'france',
          label: 'France',
          selected: true
        },
        {
          value: 'portugal',
          label: 'Portugal'
        },
        {
          value: 'spain',
          label: 'Spain'
        },
        'or',
        {
          value: 'none',
          label: 'No, I will not be travelling to any of these countries',
          selected: true,
          exclusive: true
        }
      ]}
    />
  )
};

export const Content: Story = {
  args: {
    name: 'contact',
    hint: 'Select all options that are relevant to you.'
  },
  render: ({ ...props }) => (
    <Checkboxes
      {...props}
      label={
        <h1 className="govuk-heading-l">How would you like to be contacted?</h1>
      }
      options={[
        {
          value: 'email',
          label: 'Email',
          conditional: (
            <TextInput
              autoComplete="email"
              className="govuk-!-width-one-third"
              id="contact-by-email"
              label="Email address"
              name="contact-by-email"
              spellCheck={false}
              type="email"
            />
          )
        },
        {
          value: 'phone',
          label: 'Phone',
          conditional: (
            <TextInput
              autoComplete="tel"
              className="govuk-!-width-one-third"
              id="contact-by-phone"
              label="Phone number"
              name="contact-by-phone"
              spellCheck={false}
              type="tel"
            />
          )
        },
        {
          value: 'text message',
          label: 'Text message',
          conditional: (
            <TextInput
              autoComplete="tel"
              className="govuk-!-width-one-third"
              id="contact-by-text"
              label="Mobile phone number"
              name="contact-by-text"
              spellCheck={false}
              type="tel"
            />
          )
        }
      ]}
    />
  )
};

export const Small: Story = {
  args: { name: 'organisation', hint: undefined, classModifiers: 'small' },
  render: ({ ...props }) => (
    <Checkboxes
      {...props}
      label={<h3>Organisation</h3>}
      options={[
        {
          value: 'hmrc',
          label: 'HM Revenue and Customs (HMRC)'
        },
        {
          value: 'employment-tribunal',
          label: 'Employment Tribunal'
        },
        {
          value: 'MoD',
          label: 'Ministry of Defence'
        },
        {
          value: 'DfT',
          label: 'Department for Transport'
        }
      ]}
    />
  )
};

export const Errors: Story = {
  args: {
    name: 'nationality',
    error:
      'Select if you are British, Irish or a citizen of a different country '
  },
  render: ({ ...props }) => (
    <Checkboxes
      {...props}
      label={<h1 className="govuk-heading-l">What is your nationality?</h1>}
      options={[
        {
          value: 'british',
          label: 'British',
          hint: 'including English, Scottish, Welsh and Northern Irish'
        },
        {
          value: 'irish',
          label: 'Irish'
        },
        {
          value: 'other',
          label: 'Citizen of another country'
        }
      ]}
    />
  )
};
