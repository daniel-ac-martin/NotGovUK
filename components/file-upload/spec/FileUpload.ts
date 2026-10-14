import { createElement as h } from 'react';
import { render, screen } from '@react-foundry/component-test-helpers';
import FileUpload, { FileUploadProps } from '../src/FileUpload';

describe('FileUpload', () => {
  const minimalProps: FileUploadProps = {
    label: 'Document',
    name: 'doc',
  };

  describe('when given minimal valid props', () => {
    beforeEach(async () => {
      render(h(FileUpload, minimalProps));
    });

    it('renders an element', async () => expect(screen.getAllByRole('generic')[0]).toBeInTheDocument());
    it('contains the label', async () => expect(screen.getAllByRole('generic')[0]).toHaveTextContent('Document'));
  });

  describe('when given all valid props', () => {
    const props: FileUploadProps = {
      ...minimalProps,
      error: 'Upload your document',
      hint: 'Your document',
      labelHeading: 'h1',
      labelClassModifiers: 'm'
    };
    beforeEach(async () => {
      render(h(FileUpload, props));
    });

    it('renders an element', async () => expect(screen.getAllByRole('generic')[0]).toBeInTheDocument());
    it('contains the label', async () => expect(screen.getAllByRole('generic')[0]).toHaveTextContent('Document'));
    it('is described by the error and the hint', async () => expect(screen.getByLabelText('Document')).toHaveAccessibleDescription('Your document Error: Upload your document'));
    it('renders the label as a level 1 heading', async () => expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Document'));
  });
});
