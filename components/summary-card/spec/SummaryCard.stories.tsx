import type { Meta, StoryObj } from '@storybook/react-vite';

import { Fragment } from 'react';
import { VisuallyHidden } from '@not-govuk/visually-hidden';
import { SummaryCard } from '../src/SummaryCard';

const meta = {
  title: 'Internal/Summary card',
  parameters: {
    chromatic: {
      viewports: [640, 480]
    },
    description: 'A component to split multiple summary lists.'
  },
  component: SummaryCard,
  args: { title: 'Lead tenant' }
} satisfies Meta<typeof SummaryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: ({ ...props }) => (
    <SummaryCard {...props}>
      <p>Content</p>
    </SummaryCard>
  )
};

export const Standard: Story = {
  args: {},
  render: ({ ...props }) => (
    <SummaryCard {...props}>
      <p>Content</p>
    </SummaryCard>
  )
};

export const Actions: Story = {
  args: { title: 'University of Gloucestershire' },
  render: ({ ...props }) => (
    <SummaryCard
      {...props}
      actions={[
        {
          href: '#',
          children: (
            <Fragment>
              Delete choice
              <VisuallyHidden> of University of Gloucestershire</VisuallyHidden>
            </Fragment>
          )
        },
        {
          href: '#',
          children: (
            <Fragment>
              Withdraw
              <VisuallyHidden>
                {' '}
                from University of Gloucestershire
              </VisuallyHidden>
            </Fragment>
          )
        }
      ]}
    >
      <p>Content</p>
    </SummaryCard>
  )
};
