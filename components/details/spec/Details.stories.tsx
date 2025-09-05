import type { Meta, StoryObj } from '@storybook/react-vite';

import { Details } from '../src/Details';

const meta = {
  title: 'Details',
  parameters: {
    chromatic: {
      viewports: [640, 480]
    },
    description:
      'A component to make a page easier to scan by letting users reveal more detailed information only if they need it.'
  },
  component: Details,
  args: { summary: 'Help with nationality' }
} satisfies Meta<typeof Details>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: ({ ...props }) => (
    <Details {...props}>
      <p>
        We need to know your nationality so we can work out which elections
        you\u2019re entitled to vote in. If you cannot provide your nationality,
        you\u2019ll have to send copies of identity documents through the post.
      </p>
    </Details>
  )
};

export const Standard: Story = {
  args: {},
  render: ({ ...props }) => (
    <Details {...props}>
      <p>
        We need to know your nationality so we can work out which elections
        you\u2019re entitled to vote in. If you cannot provide your nationality,
        you\u2019ll have to send copies of identity documents through the post.
      </p>
    </Details>
  )
};
