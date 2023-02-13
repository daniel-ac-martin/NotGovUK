import { createElement as h } from 'react';
import { render, screen } from '@not-govuk/component-test-helpers';
import Anchor from '../src/Anchor';

describe('Anchor', () => {
  describe('when given a href with a relative URL', () => {
    beforeEach(async () => {
      render(h(Anchor, { href: '/location' }, 'My link'));
    });

    it('is a link', async () => expect(screen.getByRole('link')).toBeInTheDocument());
    it('to the HRef provided', async () => expect(screen.getByRole('link')).toHaveAttribute('href', '/location'));
    it('with the text provided', async () => expect(screen.getByRole('link')).toHaveTextContent('My link'));
  });

  describe('when given a href with an absolute URL', () => {
    beforeEach(async () => {
      render(h(Anchor, { href: '//example.com/location' }, 'My link'));
    });

    it('is a link', async () => expect(screen.getByRole('link')).toBeInTheDocument());
    it('to the HRef provided', async () => expect(screen.getByRole('link')).toHaveAttribute('href', '//example.com/location'));
    it('with the text provided', async () => expect(screen.getByRole('link')).toHaveTextContent('My link'));
  });

  describe('when given a href with a hash link', () => {
    beforeEach(async () => {
      render(h(Anchor, { href: '#top' }, 'My link'));
    });

    it('is a link', async () => expect(screen.getByRole('link')).toBeInTheDocument());
    it('to the HRef provided', async () => expect(screen.getByRole('link')).toHaveAttribute('href', '/current#top'));
    it('with the text provided', async () => expect(screen.getByRole('link')).toHaveTextContent('My link'));
  });

  describe('when given a href with a mailto', () => {
    beforeEach(async () => {
      render(h(Anchor, { href: 'mailto:user@example.com' }, 'My link'));
    });

    it('is a link', async () => expect(screen.getByRole('link')).toBeInTheDocument());
    it('to the HRef provided', async () => expect(screen.getByRole('link')).toHaveAttribute('href', 'mailto:user@example.com'));
    it('with the text provided', async () => expect(screen.getByRole('link')).toHaveTextContent('My link'));
  });
});
