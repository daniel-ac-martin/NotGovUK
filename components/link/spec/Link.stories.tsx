import type { Meta, StoryObj } from '@storybook/react-vite';

import { Panel } from '@not-govuk/panel';
import { A } from '../src/Link';

const meta = {
  title: 'Internal/Link',
  parameters: {
    chromatic: {
      viewports: [320, 320]
    },
    description: "A drop-in replacement for the 'a' element with GovUK styling."
  },
  component: A,
  args: { href: '#', children: 'Text' }
} satisfies Meta<typeof A>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Link: Story = {
  args: {}
};

export const Standard: Story = {
  args: {}
};

export const NoVisitedState: Story = {
  args: { classModifiers: 'no-visited-state' },
  name: 'No visited state'
};

export const OpenInNewTab: Story = {
  args: { rel: 'noreferrer noopener', target: '_blank' },
  name: 'Open in new tab'
};

export const DarkBackgrounds: Story = {
  args: { classModifiers: 'inverse' },
  render: ({ ...props }) => (
    <Panel classModifiers="interruption">
      <p>
        <A {...props} />
      </p>
    </Panel>
  ),
  name: 'Dark backgrounds'
};

export const NoUnderline: Story = {
  args: { classModifier: 'no-underline' },
  name: 'No underline'
};
