import type { Meta, StoryObj } from '@storybook/react-vite';

import { SkipLink } from '../src/SkipLink';

const meta = {
  title: 'Skip link',
  parameters: {
    chromatic: {
      viewports: [640, 480]
    },
    description:
      'A component to help keyboard-only users skip to the main content on a page.'
  },
  component: SkipLink,
  args: {}
} satisfies Meta<typeof SkipLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: ({ ...props }) => (
    <>
      <p>
        To view the skip link component tab to this example, or click inside
        this example and press tab.
      </p>
      <SkipLink {...props} for="content" />
    </>
  )
};

export const Standard: Story = {
  args: {},
  render: ({ ...props }) => (
    <>
      <p>
        To view the skip link component tab to this example, or click inside
        this example and press tab.
      </p>
      <SkipLink {...props} for="content" />
    </>
  )
};

export const Custom: Story = {
  args: {},
  render: ({ ...props }) => (
    <>
      <p>
        To view the skip link component tab to this example, or click inside
        this example and press tab.
      </p>
      <SkipLink {...props} for="content">
        Skip ahead
      </SkipLink>
    </>
  )
};
