import type { Meta, StoryObj } from '@storybook/react-vite';

import { AnchorList } from '../src/AnchorList';

const meta = {
  title: 'Base/Anchor list',
  parameters: {},
  component: AnchorList,
  args: {}
} satisfies Meta<typeof AnchorList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: ({ ...props }) => (
    <AnchorList
      {...props}
      items={[
        {
          href: '/',
          text: 'Inactive 1'
        },
        {
          href: '#main-content',
          text: 'Active'
        },
        {
          href: '/#main-content',
          text: 'Inactive 2'
        }
      ]}
    />
  )
};

export const Standard: Story = {
  args: {},
  render: ({ ...props }) => (
    <AnchorList
      {...props}
      items={[
        {
          href: '/',
          text: 'Inactive 1'
        },
        {
          href: '#main-content',
          text: 'Active'
        },
        {
          href: '/#main-content',
          text: 'Inactive 2'
        }
      ]}
    />
  )
};

export const Ordered: Story = {
  args: { as: 'ol' },
  render: ({ ...props }) => (
    <AnchorList
      {...props}
      items={[
        {
          href: '/',
          text: 'Inactive 1'
        },
        {
          href: '#main-content',
          text: 'Active'
        },
        {
          href: '/#main-content',
          text: 'Inactive 2'
        }
      ]}
    />
  )
};
