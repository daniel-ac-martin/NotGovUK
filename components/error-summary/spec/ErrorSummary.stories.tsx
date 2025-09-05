import type { Meta, StoryObj } from '@storybook/react-vite';

import { Fragment } from 'react';
import { Checkboxes } from '@not-govuk/checkboxes';
import { DateInput } from '@not-govuk/date-input';
import { GovUKPage } from '@not-govuk/page';
import { TextInput } from '@not-govuk/text-input';
import { ErrorSummary } from '../src/ErrorSummary';

const meta = {
  title: 'Error summary',
  parameters: {
    chromatic: {
      viewports: [640, 480]
    },
    description: 'A component to summarise any errors a user has made.'
  },
  component: ErrorSummary,
  args: { title: 'There is a problem' }
} satisfies Meta<typeof ErrorSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: ({ ...props }) => (
    <ErrorSummary
      {...props}
      items={[
        {
          text: 'The date your passport was issued must be in the past',
          href: '#'
        },
        {
          text: 'Enter a postcode, like AA1 1AA',
          href: '#'
        }
      ]}
    />
  )
};

export const Standard: Story = {
  args: {},
  render: ({ ...props }) => (
    <ErrorSummary
      {...props}
      items={[
        {
          text: 'The date your passport was issued must be in the past',
          href: '#'
        },
        {
          text: 'Enter a postcode, like AA1 1AA',
          href: '#'
        }
      ]}
    />
  )
};

export const Linking: Story = {
  args: {},
  render: ({ ...props }) => (
    <Fragment>
      <ErrorSummary
        {...props}
        items={[
          {
            text: 'Enter your full name',
            href: '#full-name-input'
          }
        ]}
      />
      <h1>Your details</h1>
      <TextInput
        id="full-name"
        label="Full name"
        name="name"
        autoComplete="name"
        error="Enter your full name"
      />
    </Fragment>
  )
};

export const LinkingToDateInput: Story = {
  args: {},
  render: ({ ...props }) => (
    <Fragment>
      <ErrorSummary
        {...props}
        items={[
          {
            text: 'The date your passport was issued must include a year',
            href: '#passport-issued-year'
          }
        ]}
      />
      <DateInput
        id="passport-issued"
        label={
          <h1 className="govuk-heading-l">When was your passport issued?</h1>
        }
        name="passport-issued"
        hint="For example, 12 11 2007"
        error={{
          year: 'The date your passport was issued must include a year'
        }}
      />
    </Fragment>
  )
};

export const LinkingToCheckboxes: Story = {
  args: {},
  render: ({ ...props }) => (
    <Fragment>
      <ErrorSummary
        {...props}
        items={[
          {
            text: 'Select if you are British, Irish or a citizen of a different country',
            href: '#nationality-checkbox-0'
          }
        ]}
      />
      <Checkboxes
        label={<h1 className="govuk-heading-l">What is your nationality?</h1>}
        name="nationality"
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
        hint="Select all that apply."
        error="Select if you are British, Irish or a citizen of a different country"
      />
    </Fragment>
  )
};

export const WhereToPut: Story = {
  args: {},
  render: ({ ...props }) => (
    <GovUKPage
      maxContentsWidth="690"
      serviceName="Service name"
      serviceHref="#"
      backHref="#"
    >
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <ErrorSummary
            {...props}
            items={[
              {
                text: 'The date your passport was issued must include a year',
                href: '#passport-issued-year'
              }
            ]}
          />
          <DateInput
            id="passport-issued"
            label={
              <h1 className="govuk-heading-l">
                When was your passport issued?
              </h1>
            }
            name="passport-issued"
            hint="For example, 12 11 2007"
            error={{
              year: 'The date your passport was issued must include a year'
            }}
          />
        </div>
      </div>
    </GovUKPage>
  )
};
