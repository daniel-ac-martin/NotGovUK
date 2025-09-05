import type { Meta, StoryObj } from '@storybook/react-vite';

import { InsetText } from '../src/InsetText';

const meta = {
  title: 'Inset text',
  parameters: {
    chromatic: {
      viewports: [640, 480]
    },
    description: 'A block of text that is inset.'
  },
  component: InsetText,
  args: {}
} satisfies Meta<typeof InsetText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: ({ ...props }) => (
    <InsetText {...props}>
      <p>
        It can take up to 8 weeks to register a lasting power of attorney if
        there are no mistakes in the application.
      </p>
    </InsetText>
  )
};

export const Standard: Story = {
  args: {},
  render: ({ ...props }) => (
    <InsetText {...props}>
      <p>
        It can take up to 8 weeks to register a lasting power of attorney if
        there are no mistakes in the application.
      </p>
    </InsetText>
  )
};
