import type { Meta, StoryObj } from '@storybook/react-vite';

import { Input } from '@not-govuk/input';
import { Label } from '@not-govuk/label';
import { VisuallyHidden } from '@not-govuk/visually-hidden';
import { FieldSet } from '../src/FieldSet';

const meta = {
  title: 'FieldSet',
  parameters: {
    chromatic: {
      viewports: [640, 480]
    },
    description: 'A set of form fields.'
  },
  component: FieldSet,
  args: {}
} satisfies Meta<typeof FieldSet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { legend: 'My fieldset', children: 'Content' }
};

export const Standard: Story = {
  args: {},
  render: ({ ...props }) => (
    <FieldSet
      {...props}
      legend={<h1 className="govuk-heading-l">What is your address?</h1>}
    >
      <div className="govuk-form-group">
        <Label>
          Building and street <VisuallyHidden>line 2 of 2</VisuallyHidden>
        </Label>
        <Input name="address-line1" autoComplete="address-line1" />
      </div>
      <div className="govuk-form-group">
        <Label>
          <VisuallyHidden>Building and street line 2 of 2</VisuallyHidden>
        </Label>
        <Input name="address-line2" autoComplete="address-line2" />
      </div>
      <div className="govuk-form-group">
        <Label>Town or city</Label>
        <Input
          name="address-town"
          autoComplete="address-town"
          className="govuk-!-width-two-thirds"
        />
      </div>
      <div className="govuk-form-group">
        <Label>County</Label>
        <Input
          name="address-county"
          autoComplete="address-county"
          className="govuk-!-width-two-thirds"
        />
      </div>
      <div className="govuk-form-group">
        <Label>Postcode</Label>
        <Input
          name="address-postcode"
          autoComplete="address-postcode"
          width={10}
        />
      </div>
    </FieldSet>
  )
};

export const LegendAsPageHeading: Story = {
  args: {},
  render: ({ ...props }) => (
    <FieldSet
      {...props}
      legend={<h1 className="govuk-heading-l">Legend as page heading</h1>}
    />
  ),
  name: 'Legend as page heading'
};
