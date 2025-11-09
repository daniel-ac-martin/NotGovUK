import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '@not-govuk/button';
import { Panel } from '../src/Panel';

const meta = {
  title: 'Panel',
  parameters: {
    chromatic: {
      viewports: [640, 480]
    },
    description:
      'A visible container used on confirmation or results pages to highlight important content.',
    image:
      'https://snapshots.chromatic.com/snapshots/5f1488148c817700223adb9a-5ff08dbae29b2700217b53b3/capture.png'
  },
  component: Panel,
  args: { classModifiers: 'confirmation', title: 'Application complete' }
} satisfies Meta<typeof Panel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: ({ ...props }) => (
    <Panel {...props}>
      <p>
        Your reference number
        <br />
        <strong>HDJ2123F</strong>
      </p>
    </Panel>
  )
};

export const Standard: Story = {
  args: {},
  render: ({ ...props }) => (
    <Panel {...props}>
      <p>
        Your reference number
        <br />
        <strong>HDJ2123F</strong>
      </p>
    </Panel>
  )
};

export const Interruption: Story = {
  args: {
    classModifiers: 'interruption',
    title: 'How to renew your passport online'
  },
  render: ({ ...props }) => (
    <Panel {...props}>
      <ol>
        <li>
          <a href="#">Get a digital passport photo</a>
        </li>
        <li>Apply online</li>
        <li>Pay for your new passport online</li>
        <li>Send us your old passport</li>
      </ol>
      <Button href="#">Continue</Button>
    </Panel>
  )
};
