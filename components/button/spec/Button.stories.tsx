import type { Meta, StoryObj } from '@storybook/react-vite';

import { ButtonGroup } from '@not-govuk/button-group';
import { A } from '@not-govuk/link';
import { Panel } from '@not-govuk/panel';
import { Button, StartButton, SubmitButton } from '../src/Button';

const meta = {
  title: 'Button',
  parameters: {
    chromatic: {
      viewports: [640, 480]
    },
    description: 'A component to allow users to carry out an action.'
  },
  component: Button,
  args: { children: 'Save and continue' }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {}
};

export const Standard: Story = {
  args: {}
};

export const Start: Story = {
  args: { children: undefined },
  render: ({ ...props }) => <StartButton href="#" />
};

export const Secondary: Story = {
  args: { children: 'Find address', classModifiers: 'secondary' }
};

export const Warning: Story = {
  args: { children: 'Delete account', classModifiers: 'warning' }
};

export const DarkBackgrounds: Story = {
  args: { children: 'Create an account', classModifiers: 'inverse' },
  render: ({ ...props }) => (
    <Panel classModifiers="interruption">
      <Button {...props} />
    </Panel>
  ),
  name: 'Dark backgrounds'
};

export const Disabled: Story = {
  args: { children: 'Disabled button', disabled: true }
};

export const Group: Story = {
  args: {},
  render: ({ ...props }) => (
    <ButtonGroup>
      <Button {...props} />
      <Button classModifiers="secondary">Save as draft</Button>
    </ButtonGroup>
  )
};

export const GroupWithLink: Story = {
  args: { children: 'Continue' },
  render: ({ ...props }) => (
    <ButtonGroup>
      <Button {...props} />
      <A href="#">Cancel</A>
    </ButtonGroup>
  ),
  name: 'Group with link'
};

export const PreventDoubleClick: Story = {
  args: { children: 'Confirm and send', 'data-prevent-double-click': 'true' },
  name: 'Prevent double click'
};

export const Submit: Story = {
  args: { children: undefined },
  render: ({ ...props }) => <SubmitButton>Save and continue</SubmitButton>
};

export const Hyperlink: Story = {
  args: { children: 'New search', href: '#', classModifiers: 'secondary' }
};
