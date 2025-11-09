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
          label={<h2>What is your name?</h2>}
          hint="Write your firstname followed by your surname"
          validators={[required()]}
        />
        <Form.Submit>Continue</Form.Submit>
      </Form.Page>
      <Form.Page>
        <Form.Radios
          name="sex"
          label={<h2>Sex?</h2>}
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
              label={<h2>What is your date of birth?</h2>}
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
              label={<h2>Are you married?</h2>}
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
      <Form.TextInput
        name="fullName"
        prettyName="name"
        label={<h2>What is your name?</h2>}
        hint="Write your firstname followed by your surname"
        validators={[required()]}
      />
      <Form.Radios
        name="sex"
        label={<h2>Sex?</h2>}
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
        label={<h2>What is your date of birth?</h2>}
        validators={[
          required('Provide your date of birth'),
          past(),
          after('1900-01-01')()
        ]}
      />
      <Form.Radios
        name="married"
        label={<h2>Are you married?</h2>}
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
          label={<h2>What is your name?</h2>}
          hint="Write your firstname followed by your surname"
          validators={[required()]}
        />
        <Form.Submit>Continue</Form.Submit>
      </Form.Page>
      <Form.Page>
        <Form.Radios
          name="sex"
          label={<h2>Sex?</h2>}
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
          label={<h2>What is your date of birth?</h2>}
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
          label={<h2>Are you married?</h2>}
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
          label={<h2>What is your name?</h2>}
          hint="Write your firstname followed by your surname"
          validators={[required()]}
        />
        <Form.Submit>Continue</Form.Submit>
      </Form.Page>
      <Form.Page>
        <Form.Radios
          name="sex"
          label={<h2>Sex?</h2>}
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
              label={<h2>What is your date of birth?</h2>}
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
              label={<h2>Are you married?</h2>}
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
