import type { Meta, StoryObj } from '@storybook/react-vite';

import { Form, after, past, required } from '../src/Form';

const meta = {
  title: 'Unofficial/Form',
  parameters: {
    chromatic: {
      viewports: [640, 480]
    },
    description: 'A component to collect information from the user.'
  },
  component: Form,
  args: { action: '/result', method: 'get' }
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: ({ ...props }) => (
    <Form {...props}>
      <Form.Page>
        <Form.TextInput
          name="fullName"
          prettyName="name"
          label="What is your name?"
          labelHeading="h1"
          hint="Write your firstname followed by your surname"
          validators={[required()]}
        />
        <Form.Submit>Continue</Form.Submit>
      </Form.Page>
      <Form.Page>
        <Form.Radios
          name="sex"
          label="Sex?"
          labelHeading="h1"
          options={[
            {
              value: 'male',
              label: 'Male'
            },
            {
              value: 'female',
              label: 'Female'
            },
            {
              value: 'no',
              label: "No thanks, we're British"
            }
          ]}
          validators={[required('Provide your sex')]}
        />
        <Form.Submit>Continue</Form.Submit>
      </Form.Page>
      <Form.Fork
        if={(v) => v.sex === 'male'}
        then={
          <Form.Page>
            <Form.DateInput
              name="dob"
              prettyName="date of birth"
              label="What is your date of birth?"
              labelHeading="h1"
              validators={[
                required('Provide your date of birth'),
                past(),
                after('1900-01-01')()
              ]}
            />
            <Form.Submit>Submit</Form.Submit>
          </Form.Page>
        }
        else={
          <Form.Page>
            <Form.Radios
              name="married"
              label="Are you married?"
              labelHeading="h1"
              options={[
                {
                  value: 'Y',
                  label: 'Yes'
                },
                {
                  value: 'N',
                  label: 'No'
                }
              ]}
              validators={[required('Provide your marital status')]}
            />
            <Form.Submit>Submit</Form.Submit>
          </Form.Page>
        }
      />
    </Form>
  )
};

export const Standard: Story = {
  args: {},
  render: ({ ...props }) => (
    <Form {...props}>
      <h1 className="govuk-heading-l">Your details</h1>
      <Form.TextInput
        name="fullName"
        prettyName="name"
        label="What is your name?"
        labelHeading="h2"
        hint="Write your firstname followed by your surname"
        validators={[required()]}
      />
      <Form.Radios
        name="sex"
        label="Sex?"
        labelHeading="h2"
        options={[
          {
            value: 'male',
            label: 'Male'
          },
          {
            value: 'female',
            label: 'Female'
          },
          {
            value: 'no',
            label: "No thanks, we're British"
          }
        ]}
        validators={[required('Provide your sex')]}
      />
      <Form.DateInput
        name="dob"
        prettyName="date of birth"
        label="What is your date of birth?"
        labelHeading="h2"
        validators={[
          required('Provide your date of birth'),
          past(),
          after('1900-01-01')()
        ]}
      />
      <Form.Radios
        name="married"
        label="Are you married?"
        labelHeading="h2"
        options={[
          {
            value: 'Y',
            label: 'Yes'
          },
          {
            value: 'N',
            label: 'No'
          }
        ]}
        validators={[required('Provide your marital status')]}
      />
      <Form.Submit>Submit</Form.Submit>
    </Form>
  )
};

export const Steps: Story = {
  args: {},
  render: ({ ...props }) => (
    <Form {...props}>
      <Form.Page>
        <Form.TextInput
          name="fullName"
          prettyName="name"
          label="What is your name?"
          labelHeading="h1"
          hint="Write your firstname followed by your surname"
          validators={[required()]}
        />
        <Form.Submit>Continue</Form.Submit>
      </Form.Page>
      <Form.Page>
        <Form.Radios
          name="sex"
          label="Sex?"
          labelHeading="h1"
          options={[
            {
              value: 'male',
              label: 'Male'
            },
            {
              value: 'female',
              label: 'Female'
            },
            {
              value: 'no',
              label: "No thanks, we're British"
            }
          ]}
          validators={[required('Provide your sex')]}
        />
        <Form.Submit>Continue</Form.Submit>
      </Form.Page>
      <Form.Page>
        <Form.DateInput
          name="dob"
          prettyName="date of birth"
          label="What is your date of birth?"
          labelHeading="h1"
          validators={[
            required('Provide your date of birth'),
            past(),
            after('1900-01-01')()
          ]}
        />
        <Form.Submit>Continue</Form.Submit>
      </Form.Page>
      <Form.Page>
        <Form.Radios
          name="married"
          label="Are you married?"
          labelHeading="h1"
          options={[
            {
              value: 'Y',
              label: 'Yes'
            },
            {
              value: 'N',
              label: 'No'
            }
          ]}
          validators={[required('Provide your marital status')]}
        />
        <Form.Submit>Submit</Form.Submit>
      </Form.Page>
    </Form>
  )
};

export const Forks: Story = {
  args: {},
  render: ({ ...props }) => (
    <Form {...props}>
      <Form.Page>
        <Form.TextInput
          name="fullName"
          prettyName="name"
          label="What is your name?"
          labelHeading="h1"
          hint="Write your firstname followed by your surname"
          validators={[required()]}
        />
        <Form.Submit>Continue</Form.Submit>
      </Form.Page>
      <Form.Page>
        <Form.Radios
          name="sex"
          label="Sex?"
          labelHeading="h1"
          options={[
            {
              value: 'male',
              label: 'Male'
            },
            {
              value: 'female',
              label: 'Female'
            },
            {
              value: 'no',
              label: "No thanks, we're British"
            }
          ]}
          validators={[required('Provide your sex')]}
        />
        <Form.Submit>Continue</Form.Submit>
      </Form.Page>
      <Form.Fork
        if={(v) => v.sex === 'male'}
        then={
          <Form.Page>
            <Form.DateInput
              name="dob"
              prettyName="date of birth"
              label="What is your date of birth?"
              labelHeading="h1"
              validators={[
                required('Provide your date of birth'),
                past(),
                after('1900-01-01')()
              ]}
            />
            <Form.Submit>Submit</Form.Submit>
          </Form.Page>
        }
        else={
          <Form.Page>
            <Form.Radios
              name="married"
              label="Are you married?"
              labelHeading="h1"
              options={[
                {
                  value: 'Y',
                  label: 'Yes'
                },
                {
                  value: 'N',
                  label: 'No'
                }
              ]}
              validators={[required('Provide your marital status')]}
            />
            <Form.Submit>Submit</Form.Submit>
          </Form.Page>
        }
      />
    </Form>
  )
};
