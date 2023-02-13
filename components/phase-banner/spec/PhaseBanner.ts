import { createElement as h } from 'react';
import { render, screen } from '@not-govuk/component-test-helpers';
import PhaseBanner from '../src/PhaseBanner';

describe('PhaseBanner', () => {
  const minimalProps = {
    phase: 'test'
  };

  describe('when given valid props', () => {
    beforeEach(async () => {
      render(h(PhaseBanner, minimalProps, 'This is just a test.'));
    });

    it('renders an element', async () => expect(screen.getAllByRole('generic')[0]).toBeInTheDocument());
    it('declares the phase provided', async () => expect(screen.getAllByRole('generic')[0]).toHaveTextContent('test'))
    it('displays the message provided', async () => expect(screen.getAllByRole('generic')[0]).toHaveTextContent('This is just a test.'))
  });
});
