import { createElement as h } from 'react';
import { render, screen } from '@not-govuk/component-test-helpers';
import BackLink from '../src/BackLink';

describe('BackLink', () => {
  describe('when given a href', () => {
    describe('and a text property', () => {
      beforeEach(async () => {
        render(h(BackLink, { href: '/back', text: 'Reverse' }));
      });

      it('is a link', async () => expect(screen.getByRole('link')).toBeInTheDocument());
      it('is a link with the text provided', async () => expect(screen.getByRole('link')).toHaveTextContent('Reverse'));
      it('links to the href provided', async () => expect(screen.getByRole('link')).toHaveAttribute('href', '/back'));
    });

    describe('but NOT a text property', () => {
      beforeEach(async () => {
        render(h(BackLink, { href: '/back' }));
      });

      it('is a link', async () => expect(screen.getByRole('link')).toBeInTheDocument());
      it('is a link with the text \'Back\'', async () => expect(screen.getByRole('link')).toHaveTextContent('Back'));
      it('links to the href provided', async () => expect(screen.getByRole('link')).toHaveAttribute('href', '/back'));
    });
  });

  describe('when NOT given a href', () => {
    beforeEach(async () => {
      render(h(BackLink, { id: 'back' }));
    });

    it('is a link', async () => expect(screen.getByRole('link')).toBeInTheDocument());
    it('is a link with the text \'Back\'', async () => expect(screen.getByRole('link')).toHaveTextContent('Back'));

    describe.skip('when clicked', () => {
      it('takes a step back in the history', async () => expect(false).toEqual(true));
    });
  });
});
