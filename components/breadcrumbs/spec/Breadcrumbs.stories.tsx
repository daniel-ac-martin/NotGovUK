import type { Meta, StoryObj } from '@storybook/react-vite';

import { Panel } from '@not-govuk/panel';
import { Breadcrumbs } from '../src/Breadcrumbs';

const meta = {
  title: 'Breadcrumbs',
  parameters: {
    chromatic: {
      viewports: [640, 480]
    },
    description:
      "A component to help users to understand where they are within a website's structure and move between levels."
  },
  component: Breadcrumbs,
  args: {}
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: ({ ...props }) => (
    <Breadcrumbs
      {...props}
      items={[
        {
          text: 'Home',
          href: '#'
        },
        {
          text: 'Passports, travel and living abroad',
          href: '#'
        },
        {
          text: 'Travel abroad',
          href: '#'
        }
      ]}
    />
  )
};

export const Standard: Story = {
  args: {},
  render: ({ ...props }) => (
    <Breadcrumbs
      {...props}
      items={[
        {
          text: 'Home',
          href: '#'
        },
        {
          text: 'Passports, travel and living abroad',
          href: '#'
        },
        {
          text: 'Travel abroad',
          href: '#'
        }
      ]}
    />
  )
};

export const Collapsing: Story = {
  args: { classModifiers: 'collapse-on-mobile' },
  render: ({ ...props }) => (
    <Breadcrumbs
      {...props}
      items={[
        {
          text: 'Home',
          href: '#'
        },
        {
          text: 'Environment',
          href: '#'
        },
        {
          text: 'Rural and countryside',
          href: '#'
        },
        {
          text: 'Rural development and land management',
          href: '#'
        },
        {
          text: 'Economic growth in rural areas',
          href: '#'
        }
      ]}
    />
  )
};

export const DarkBackgrounds: Story = {
  args: { classModifiers: 'inverse' },
  render: ({ ...props }) => (
    <Panel classModifiers="interruption">
      <Breadcrumbs
        {...props}
        items={[
          {
            text: 'Home',
            href: '#'
          },
          {
            text: 'Passports, travel and living abroad',
            href: '#'
          },
          {
            text: 'Travel abroad',
            href: '#'
          }
        ]}
      />
    </Panel>
  ),
  name: 'Dark backgrounds'
};
