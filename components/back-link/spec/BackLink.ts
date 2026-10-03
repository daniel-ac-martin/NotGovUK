import type { FC } from 'react';

import { Fragment, createElement as h } from 'react';
import { fireEvent, render, screen } from '@react-foundry/component-test-helpers';
import { useLocation } from '@react-foundry/router';
import BackLink from '../src/BackLink';

const Location: FC<{}> = () => h('data', { 'aria-label': 'location' }, useLocation().pathname);

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
      render(h(Fragment, {}, h(BackLink, { id: 'back' }), h(Location)));
    });

    it('is a link', async () => expect(screen.getByRole('link')).toBeInTheDocument());
    it('is a link with the text \'Back\'', async () => expect(screen.getByRole('link')).toHaveTextContent('Back'));
    it('starts on the current page', async () => expect(screen.getByLabelText('location')).toHaveTextContent('/current'));

    describe('when clicked', () => {
      let result: boolean;

      beforeEach(async () => {
        result = fireEvent.click(screen.getByRole('link'));
      });

      it('prevents the default action, so the browser does NOT follow the href', async () => expect(result).toBe(false));
      it('takes a step back in the history', async () => expect(screen.getByLabelText('location')).toHaveTextContent('/previous'));
    });
  });
});
