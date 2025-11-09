import type { Meta, StoryObj } from '@storybook/react-vite';

import { Pagination } from '../src/Pagination';

const meta = {
  title: 'Pagination',
  parameters: {
    chromatic: {
      viewports: [640, 480]
    },
    description:
      'A component to help users navigate forwards and backwards through a series of pages.'
  },
  component: Pagination,
  args: { currentPage: 2 }
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: ({ ...props }) => <Pagination {...props} links={['#', '#', '#']} />
};

export const Backandforth: Story = {
  args: { next: '#', previous: '#', totalPages: 3 },
  name: 'Back-and-forth'
};

export const Linklabels: Story = {
  args: { currentPage: undefined },
  render: ({ ...props }) => (
    <Pagination
      {...props}
      next={{
        href: '#',
        labelText: 'Driver CPC part 1 test: theory'
      }}
      previous={{
        href: '#',
        labelText: 'Applying for a provisional lorry or bus licence'
      }}
    />
  ),
  name: 'Link-labels'
};

export const Linklabelsinlist: Story = {
  args: { backAndForth: true },
  render: ({ ...props }) => (
    <Pagination
      {...props}
      links={[
        {
          href: '#',
          labelText: 'Driver CPC part 1 test: theory'
        },
        {
          href: '#',
          labelText: 'Driver CPC part 2 test: practice'
        },
        {
          href: '#',
          labelText: 'Applying for a provisional lorry or bus licence'
        }
      ]}
    />
  ),
  name: 'Link-labels-in-list'
};

export const Numbered: Story = {
  args: { currentPage: 7, pageParameter: 'p', totalPages: 42 },
  render: ({ ...props }) => (
    <Pagination
      {...props}
      query={{
        name: 'Pagination'
      }}
    />
  )
};

export const Firstpage: Story = {
  args: { currentPage: 1 },
  render: ({ ...props }) => <Pagination {...props} links={['#', '#', '#']} />,
  name: 'First-page'
};

export const Lastpage: Story = {
  args: { currentPage: 3 },
  render: ({ ...props }) => <Pagination {...props} links={['#', '#', '#']} />,
  name: 'Last-page'
};
