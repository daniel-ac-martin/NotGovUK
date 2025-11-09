import type { Meta, StoryObj } from '@storybook/react-vite';

import { TextInput } from '@not-govuk/text-input';
import { Radios } from '../src/Radios';

const meta = {
  title: 'Radios',
  parameters: {
    chromatic: {
      viewports: [640, 480]
    },
    description:
      'A component to allow users to choose between a small selection of options.'
  },
  component: Radios,
  args: { name: 'where-do-you-live' }
} satisfies Meta<typeof Radios>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: ({ ...props }) => (
    <Radios
      {...props}
      label={<h1 className="govuk-heading-l">Where do you live?</h1>}
      options={[
        {
          value: 'england',
          label: 'England'
        },
        {
          value: 'scotland',
          label: 'Scotland'
        },
        {
          value: 'wales',
          label: 'Wales'
        },
        {
          value: 'northern-ireland',
          label: 'Northern Ireland'
        }
      ]}
    />
  )
};

export const Standard: Story = {
  args: {},
  render: ({ ...props }) => (
    <Radios
      {...props}
      label={<h1 className="govuk-heading-l">Where do you live?</h1>}
      options={[
        {
          value: 'england',
          label: 'England'
        },
        {
          value: 'scotland',
          label: 'Scotland'
        },
        {
          value: 'wales',
          label: 'Wales'
        },
        {
          value: 'northern-ireland',
          label: 'Northern Ireland'
        }
      ]}
    />
  )
};

export const NoHeading: Story = {
  args: { label: 'Where do you live?' },
  render: ({ ...props }) => (
    <Radios
      {...props}
      options={[
        {
          value: 'england',
          label: 'England'
        },
        {
          value: 'scotland',
          label: 'Scotland'
        },
        {
          value: 'wales',
          label: 'Wales'
        },
        {
          value: 'northern-ireland',
          label: 'Northern Ireland'
        }
      ]}
    />
  ),
  name: 'No heading'
};

export const Inline: Story = {
  args: {
    name: 'changed-name',
    classModifiers: 'inline',
    hint: 'This includes changing your last name or spelling your name differently.'
  },
  render: ({ ...props }) => (
    <Radios
      {...props}
      label={<h1 className="govuk-heading-l">Have you changed your name?</h1>}
      options={[
        {
          value: 'yes',
          label: 'Yes'
        },
        {
          value: 'no',
          label: 'No'
        }
      ]}
    />
  )
};

export const Hints: Story = {
  args: {
    name: 'sign-in',
    hint: 'This includes changing your last name or spelling your name differently.'
  },
  render: ({ ...props }) => (
    <Radios
      {...props}
      label={<h1 className="govuk-heading-l">How do you want to sign in?</h1>}
      options={[
        {
          value: 'government-gateway',
          label: 'Sign in with Government Gateway',
          hint: 'You\u2019ll have a user ID if you\u2019ve registered for Self Assessment or filed a tax return online before.'
        },
        {
          value: 'govuk-verify',
          label: 'Sign in with GOV.UK Verify',
          hint: 'You\u2019ll have an account if you\u2019ve already proved your identity with either Barclays, CitizenSafe, Digidentity, Experian, Post Office, Royal Mail or SecureIdentity.'
        }
      ]}
    />
  )
};

export const Divider: Story = {
  args: {},
  render: ({ ...props }) => (
    <Radios
      {...props}
      label={<h1 className="govuk-heading-l">Where do you live?</h1>}
      options={[
        {
          value: 'england',
          label: 'England'
        },
        {
          value: 'scotland',
          label: 'Scotland'
        },
        {
          value: 'wales',
          label: 'Wales'
        },
        {
          value: 'northern-ireland',
          label: 'Northern Ireland'
        },
        'or',
        {
          value: 'abroad',
          label: 'I am a British citizen living abroad'
        }
      ]}
    />
  )
};

export const Content: Story = {
  args: { name: 'how-contacted', hint: 'Select one option.' },
  render: ({ ...props }) => (
    <Radios
      {...props}
      label={
        <h1 className="govuk-heading-l">
          How would you prefer to be contacted?
        </h1>
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
  args: { name: 'filter', classModifiers: 'small' },
  render: ({ ...props }) => (
    <Radios
      {...props}
      label={<h3>Filter</h3>}
      options={[
        {
          value: 'month',
          label: 'Monthly'
        },
        {
          value: 'year',
          label: 'Yearly'
        }
      ]}
    />
  )
};

export const Errors: Story = {
  args: { error: 'Select the country where you live' },
  render: ({ ...props }) => (
    <Radios
      {...props}
      label={<h1 className="govuk-heading-l">Where do you live?</h1>}
      options={[
        {
          value: 'england',
          label: 'England'
        },
        {
          value: 'scotland',
          label: 'Scotland'
        },
        {
          value: 'wales',
          label: 'Wales'
        },
        {
          value: 'northern-ireland',
          label: 'Northern Ireland'
        }
      ]}
    />
  )
};

export const ContentError: Story = {
  args: {
    name: 'how-contacted-error',
    defaultValue: 'email',
    hint: 'Select one option.'
  },
  render: ({ ...props }) => (
    <Radios
      {...props}
      label={
        <h1 className="govuk-heading-l">
          How would you prefer to be contacted?
        </h1>
      }
      options={[
        {
          value: 'email',
          label: 'Email',
          conditional: (
            <TextInput
              autoComplete="email"
              className="govuk-!-width-one-third"
              error="Email address cannot be blank"
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
