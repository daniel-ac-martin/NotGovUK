import { createElement as h } from 'react';
import { render, screen } from '@not-govuk/component-test-helpers';
import FileUpload from '../src/FileUpload';

describe('FileUpload', () => {
  const minimalProps = {
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
    const props = {
      ...minimalProps,
      error: 'Upload your document',
      hint: 'Your document'
    };
    beforeEach(async () => {
      render(h(FileUpload, props));
    });

    it('renders an element', async () => expect(screen.getAllByRole('generic')[0]).toBeInTheDocument());
    it('contains the label', async () => expect(screen.getAllByRole('generic')[0]).toHaveTextContent('Document'));
    it('is described by the error and the hint', async () => expect(screen.getByLabelText('Document')).toHaveAccessibleDescription('Your document Error: Upload your document'));
  });
});
