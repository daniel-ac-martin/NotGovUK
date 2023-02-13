import { createElement as h } from 'react';
import { render, screen } from '@not-govuk/component-test-helpers';
import VisuallyHidden from '../src/VisuallyHidden';

describe('VisuallyHidden', () => {
  const minimalProps = {};

  describe('when given valid props', () => {
    beforeEach(async () => {
      render(h(VisuallyHidden, minimalProps, 'Text'));
    });

    it('renders an element', async () => expect(screen.getAllByRole('generic')[0]).toBeInTheDocument());
    it('contains the child provided', async () => expect(screen.getAllByRole('generic')[0]).toHaveTextContent('Text'));
  });
});
