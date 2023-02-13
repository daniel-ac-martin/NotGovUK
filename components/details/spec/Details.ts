import { createElement as h } from 'react';
import { render, screen } from '@not-govuk/component-test-helpers';
import Details from '../src/Details';

describe('Details', () => {
  describe('when given valid props', () => {
    beforeEach(async () => {
      render(h(Details, { summary: 'Summary' }, 'Content'));
    });

    it('renders an element', async () => expect(screen.getByRole('group')).toBeInTheDocument());
    it('includes the summary provided', async () => expect(screen.getByRole('group')).toHaveTextContent('Summary'));
    it('includes the children provided', async () => expect(screen.getByRole('group')).toHaveTextContent('Content'));
  });
});
