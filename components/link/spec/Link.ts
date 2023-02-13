import { createElement as h } from 'react';
import { render, screen } from '@not-govuk/component-test-helpers';
import Link from '../src/Link';

describe('Link', () => {
  describe('when given valid props', () => {
    beforeEach(async () => {
      render(h(Link, { href: '#' }, 'Text'));
    });

    it('renders a link', async () => expect(screen.getByRole('link')).toBeInTheDocument());
    it('to the provided href', async () => expect(screen.getByRole('link')).toHaveAttribute('href', '#'));
    it('with the provided text', async () => expect(screen.getByRole('link')).toHaveTextContent('Text'));
  });
});
