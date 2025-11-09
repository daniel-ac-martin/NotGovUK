import type { Meta, StoryObj } from '@storybook/react-vite';

import { Header } from '@not-govuk/header';
import { ServiceNavigation } from '../src/ServiceNavigation';

const meta = {
  title: 'Service navigation',
  parameters: {
    chromatic: {
      viewports: [640, 480]
    },
    description:
      'A component to help users understand that they\u2019re using your service and lets them navigate around your service.'
  },
  component: ServiceNavigation,
  args: {}
} satisfies Meta<typeof ServiceNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: ({ ...props }) => (
    <ServiceNavigation
      {...props}
      items={[
        {
          href: '/styles',
          text: 'Navigation item 1'
        },
        {
          href: '#active',
          text: 'Navigation item 2'
        },
        {
          href: '/contributing',
          text: 'Navigation item 3'
        }
      ]}
    />
  )
};

export const Rebrand: Story = {
  args: {},
  render: ({ ...props }) => (
    <div className="govuk-template--rebranded">
      <ServiceNavigation
        {...props}
        items={[
          {
            href: '/styles',
            text: 'Navigation item 1'
          },
          {
            href: '#active',
            text: 'Navigation item 2'
          },
          {
            href: '/contributing',
            text: 'Navigation item 3'
          }
        ]}
      />
    </div>
  )
};

export const WithHeader: Story = {
  args: {},
  render: ({ ...props }) => (
    <>
      <Header govUK classModifiers="full-width-border" />
      <ServiceNavigation
        {...props}
        items={[
          {
            href: '/styles',
            text: 'Navigation item 1'
          },
          {
            href: '#active',
            text: 'Navigation item 2'
          },
          {
            href: '/contributing',
            text: 'Navigation item 3'
          }
        ]}
      />
    </>
  ),
  name: 'With header'
};

export const ServiceName: Story = {
  args: { serviceName: 'Service name', serviceHref: '#' },
  name: 'Service name'
};

export const Full: Story = {
  args: { serviceName: 'Service name', serviceHref: '#' },
  render: ({ ...props }) => (
    <ServiceNavigation
      {...props}
      items={[
        {
          href: '/styles',
          text: 'Navigation item 1'
        },
        {
          href: '#active',
          text: 'Navigation item 2'
        },
        {
          href: '/contributing',
          text: 'Navigation item 3'
        }
      ]}
    />
  )
};

export const SignOut: Story = {
  args: {
    serviceName: 'Service name',
    serviceHref: '#',
    signOutHref: '?sign-out#sign-out'
  },
  name: 'Sign out'
};
