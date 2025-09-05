import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Styles/Forms',
  args: {}
} satisfies Meta<typeof undefined>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FormGroup: Story = {
  args: {},
  render: ({ ...props }) => (
    <div className="form-group">
      This is a form group.
    </div>
  ),
  name: 'Form group'
};

export const FormGroupError: Story = {
  args: {},
  render: ({ ...props }) => (
    <div className="form-group error">
      This is a form group has an error.
    </div>
  ),
  name: 'Form group error'
};

export const ErrorMessage: Story = {
  args: {},
  render: ({ ...props }) => (
    <div className="error">
      <div className="message">
        This is an error message.
      </div>
    </div>
  ),
  name: 'Error message'
};

export const Fieldset: Story = {
  args: {},
  render: ({ ...props }) => (
    <fieldset>
      This is a fieldset.
    </fieldset>
  )
};

export const Legend: Story = {
  args: {},
  render: ({ ...props }) => (
    <fieldset>
      <legend>This is a legend</legend>
      This is a fieldset with a legend.
    </fieldset>
  )
};

export const Label: Story = {
  args: {},
  render: ({ ...props }) => (
    <label>
      <p>This is a label.</p>
    </label>
  )
};

export const Hint: Story = {
  args: {},
  render: ({ ...props }) => (
    <span className="hint">
      <p>This is a hint.</p>
    </span>
  )
};

export const InputText: Story = {
  args: {},
  render: ({ ...props }) => <input name="example" type="text" />,
  name: 'Input Text'
};

export const InputTextError: Story = {
  args: {},
  render: ({ ...props }) => (
    <div className="error">
      <input name="example" type="text" />
    </div>
  ),
  name: 'Input Text Error'
};

export const InputEmail: Story = {
  args: {},
  render: ({ ...props }) => <input name="example" type="email" />,
  name: 'Input E-mail'
};

export const InputPassword: Story = {
  args: {},
  render: ({ ...props }) => <input name="example" type="password" />,
  name: 'Input Password'
};

export const InputNumber: Story = {
  args: {},
  render: ({ ...props }) => <input name="example" type="number" />,
  name: 'Input Number'
};

export const InputColour: Story = {
  args: {},
  render: ({ ...props }) => <input name="example" type="color" />,
  name: 'Input Colour'
};

export const InputDate: Story = {
  args: {},
  render: ({ ...props }) => <input name="example" type="date" />,
  name: 'Input Date'
};

export const InputDatetimeLocal: Story = {
  args: {},
  render: ({ ...props }) => <input name="example" type="datetime-local" />,
  name: 'Input Datetime local'
};

export const InputTime: Story = {
  args: {},
  render: ({ ...props }) => <input name="example" type="time" />,
  name: 'Input Time'
};

export const InputFile: Story = {
  args: {},
  render: ({ ...props }) => <input name="example" type="file" />,
  name: 'Input File'
};

export const InputMonth: Story = {
  args: {},
  render: ({ ...props }) => <input name="example" type="month" />,
  name: 'Input Month'
};

export const InputWeek: Story = {
  args: {},
  render: ({ ...props }) => <input name="example" type="week" />,
  name: 'Input Week'
};

export const InputRange: Story = {
  args: {},
  render: ({ ...props }) => <input name="example" type="range" />,
  name: 'Input Range'
};

export const InputSearch: Story = {
  args: {},
  render: ({ ...props }) => <input name="example" type="search" />,
  name: 'Input Search'
};

export const InputTel: Story = {
  args: {},
  render: ({ ...props }) => <input name="example" type="tel" />,
  name: 'Input Tel'
};

export const InputURL: Story = {
  args: {},
  render: ({ ...props }) => <input name="example" type="url" />,
  name: 'Input URL'
};

export const InputCheckbox: Story = {
  args: {},
  render: ({ ...props }) => <input name="example" type="checkbox" />,
  name: 'Input Checkbox'
};

export const InputRadio: Story = {
  args: {},
  render: ({ ...props }) => <input name="example" type="radio" />,
  name: 'Input Radio'
};

export const Select: Story = {
  args: {},
  render: ({ ...props }) => (
    <select name="example">
      <option>Foo</option>
      <option>Bar</option>
      <option>Baz</option>
    </select>
  )
};

export const SelectMulti: Story = {
  args: {},
  render: ({ ...props }) => (
    <select name="example" multiple size="3">
      <option>Foo</option>
      <option>Bar</option>
      <option>Baz</option>
    </select>
  ),
  name: 'Select Multi'
};

export const Textarea: Story = {
  args: {},
  render: ({ ...props }) => <textarea name="example" />
};
