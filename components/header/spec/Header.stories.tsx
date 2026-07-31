import type { Meta, StoryObj } from '@storybook/react-vite';

import { Header } from '../src/Header';

const meta = {
  title: 'GOV.UK header',
  parameters: {
    chromatic: {
      viewports: [1280, 360]
    },
    description:
      'A component that tells users they\'re using a service on GOV.UK and lets them use GOV.UK-wide tools. Also known as the GOV.UK masthead.'
  },
  component: Header,
  args: {}
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { organisationHref: '#' }
};

export const Standard: Story = {
  args: {}
};

export const ServiceName: Story = {
  args: { serviceName: 'Service name', serviceHref: '#' },
  name: 'Service name'
};

export const FullWidth: Story = {
  args: { maxContentsWidth: -1 },
  name: 'Full width'
};
