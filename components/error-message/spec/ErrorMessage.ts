import { createElement as h } from 'react';
import { render, screen } from '@not-govuk/component-test-helpers';
import ErrorMessage from '../src/ErrorMessage';

describe('ErrorMessage', () => {
  describe('when given valid props', () => {
    beforeEach(async () => {
      render(h(ErrorMessage, {}, 'Invalid'));
    });

    it('renders an element', async () => expect(screen.getAllByRole('generic')[0]).toBeInTheDocument());
    it('includes the error message provided', async () => expect(screen.getAllByRole('generic')[0]).toHaveTextContent('Invalid'));
  });
});
