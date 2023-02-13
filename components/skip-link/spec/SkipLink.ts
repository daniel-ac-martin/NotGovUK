import { createElement as h } from 'react';
import { render, screen } from '@not-govuk/component-test-helpers';
import SkipLink from '../src/SkipLink';

describe('SkipLink', () => {
  const minimalProps = {
    for: 'content'
  };

  describe('when given minimal valid props', () => {
    beforeEach(async () => {
      render(h(SkipLink, minimalProps));
    });

    it('renders a link', async () => expect(screen.getByRole('link')).toBeInTheDocument());
    it('to the provided ID', async () => expect(screen.getByRole('link')).toHaveAttribute('href', '#content'));
    it('with appropriate text', async () => expect(screen.getByRole('link')).toHaveTextContent('Skip to main content'));
  });

  describe('when given all valid props', () => {
    beforeEach(async () => {
      render(h(SkipLink, minimalProps, 'Skip ahead'));
    });

    it('renders a link', async () => expect(screen.getByRole('link')).toBeInTheDocument());
    it('to the provided ID', async () => expect(screen.getByRole('link')).toHaveAttribute('href', '#content'));
    it('with children as the text', async () => expect(screen.getByRole('link')).toHaveTextContent('Skip ahead'));
  });
});
