import type { Meta, StoryObj } from '@storybook/react-vite';

import { Input } from '../src/Input';

const meta = {
  title: 'Internal/Input',
  parameters: {
    chromatic: {
      viewports: [640, 480]
    },
    description:
      'A component to allow users to enter a small, single piece of data.'
  },
  component: Input,
  args: { name: 'foo' }
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {}
};

export const Standard: Story = {
  args: {}
};

export const FixedWidth: Story = {
  args: { width: '2' },
  name: 'Fixed width'
};

export const PrefixAndSuffix: Story = {
  args: { prefix: '£', suffix: 'per item' },
  name: 'Prefix and suffix'
};

export const InputEmail: Story = {
  args: { name: 'example', type: 'email' },
  name: 'Input E-mail'
};

export const InputPassword: Story = {
  args: { name: 'example', type: 'password' },
  name: 'Input Password'
};

export const InputNumber: Story = {
  args: { name: 'example', type: 'number' },
  name: 'Input Number'
};

export const InputColour: Story = {
  args: { name: 'example', type: 'color' },
  name: 'Input Colour'
};

export const InputDate: Story = {
  args: { name: 'example', type: 'date' },
  name: 'Input Date'
};

export const InputDatetimeLocal: Story = {
  args: { name: 'example', type: 'datetime-local' },
  name: 'Input Datetime local'
};

export const InputTime: Story = {
  args: { name: 'example', type: 'time' },
  name: 'Input Time'
};

export const InputFile: Story = {
  args: { name: 'example', type: 'file' },
  name: 'Input File'
};

export const InputMonth: Story = {
  args: { name: 'example', type: 'month' },
  name: 'Input Month'
};

export const InputWeek: Story = {
  args: { name: 'example', type: 'week' },
  name: 'Input Week'
};

export const InputRange: Story = {
  args: { name: 'example', type: 'range' },
  name: 'Input Range'
};

export const InputSearch: Story = {
  args: { name: 'example', type: 'search' },
  name: 'Input Search'
};

export const InputTel: Story = {
  args: { name: 'example', type: 'tel' },
  name: 'Input Tel'
};

export const InputURL: Story = {
  args: { name: 'example', type: 'url' },
  name: 'Input URL'
};

export const InputCheckbox: Story = {
  args: { name: 'example', type: 'checkbox' },
  name: 'Input Checkbox'
};

export const InputRadio: Story = {
  args: { name: 'example', type: 'radio' },
  name: 'Input Radio'
};
