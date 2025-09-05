import type { Meta, StoryObj } from '@storybook/react-vite';

import { NavigationMenu } from '../src/NavigationMenu';

const meta = {
  title: 'Unofficial/Navigation menu',
  parameters: {
    chromatic: {
      viewports: [640, 480]
    },
    description:
      'A component that provides users with a list of pages to choose from.'
  },
  component: NavigationMenu,
  args: {}
} satisfies Meta<typeof NavigationMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: ({ ...props }) => (
    <NavigationMenu
      {...props}
      items={[
        {
          href: '/styles',
          text: 'Inactive 1'
        },
        {
          href: '#main-content',
          text: 'Active'
        },
        {
          href: '/contributing',
          text: 'Inactive 2'
        }
      ]}
    />
  )
};

export const Standard: Story = {
  args: {},
  render: ({ ...props }) => (
    <NavigationMenu
      {...props}
      items={[
        {
          href: '/styles',
          text: 'Inactive 1'
        },
        {
          href: '#main-content',
          text: 'Active'
        },
        {
          href: '/contributing',
          text: 'Inactive 2'
        }
      ]}
    />
  )
};

export const Subitems: Story = {
  args: {},
  render: ({ ...props }) => (
    <NavigationMenu
      {...props}
      items={[
        {
          href: '/styles',
          text: 'Inactive 1',
          items: [
            {
              href: '/styles?name=Forms',
              text: 'One'
            },
            {
              href: '/styles?name=Typography',
              text: 'Two'
            }
          ]
        },
        {
          href: '/components',
          text: 'Active',
          items: [
            {
              href: '/components?name=Back%20link',
              text: 'Inactive 1'
            },
            {
              href: '/components?name=Navigation%20menu',
              text: 'Active'
            },
            {
              href: '/components?name=Button',
              text: 'Inactive 2'
            }
          ]
        },
        {
          href: '/contributing',
          text: 'Inactive 2'
        }
      ]}
    />
  ),
  name: 'Sub-items'
};

export const Horizontal: Story = {
  args: { classModifiers: 'horizontal' },
  render: ({ ...props }) => (
    <NavigationMenu
      {...props}
      items={[
        {
          href: '/styles',
          text: 'Inactive 1'
        },
        {
          href: '#main-content',
          text: 'Active'
        },
        {
          href: '/contributing',
          text: 'Inactive 2'
        }
      ]}
    />
  )
};
