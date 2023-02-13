import { createElement as h } from 'react';
import { render, screen } from '@not-govuk/component-test-helpers';
import Aside from '../src/Aside';

describe('Aside', () => {
  describe('when given valid props', () => {
    beforeEach(async () => {
      render(h(Aside, {}, 'Child'));
    });

    it('renders an element', async () => expect(screen.getByRole('complementary')).toBeInTheDocument());
    it('renders the children', async () => expect(screen.getByRole('complementary')).toHaveTextContent('Child'));
  });
});
