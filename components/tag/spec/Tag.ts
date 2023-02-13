import { createElement as h } from 'react';
import { render, screen } from '@not-govuk/component-test-helpers';
import Tag from '../src/Tag';

describe('Tag', () => {
  describe('when given valid props', () => {
    beforeEach(async () => {
      render(h(Tag, { text: 'Test' }));
    });

    it('renders an element', async () => expect(screen.getByRole('generic')).toBeInTheDocument());
  });

  describe('when given a text property', () => {
    beforeEach(async () => {
      render(h(Tag, { text: 'Alpha' }));
    });

    it('contains the text provided', async () => expect(screen.getByRole('generic')).toHaveTextContent('Alpha'));
  });

  describe('when given a child', () => {
    beforeEach(async () => {
      render(h(Tag, {}, 'Alpha'));
    });

    it('contains the child provided', async () => expect(screen.getByRole('generic')).toHaveTextContent('Alpha'));
  });
});
