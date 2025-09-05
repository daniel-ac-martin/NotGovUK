import type { Meta, StoryObj } from '@storybook/react-vite';

import { FileUpload } from '../src/FileUpload';

const meta = {
  title: 'File upload',
  parameters: {
    chromatic: {
      viewports: [640, 480]
    },
    description: 'A component to help users select and upload a file.'
  },
  component: FileUpload,
  args: { id: 'file-upload-1', name: 'file-upload-1', label: 'Upload a file' }
} satisfies Meta<typeof FileUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {}
};

export const Standard: Story = {
  args: {}
};

export const ErrorMessages: Story = {
  args: { error: 'The CSV must be smaller than 2MB' },
  name: 'Error messages'
};
