import { createElement as h } from 'react';
import { render, screen } from '@not-govuk/component-test-helpers';
import ButtonGroup from '../src/ButtonGroup';

describe('ButtonGroup', () => {
  describe('when given valid props', () => {
    beforeEach(async () => {
      render(h(ButtonGroup, {}, 'Child'));
    });

    it('renders an element', async () => expect(screen.getAllByRole('generic')[0]).toBeInTheDocument());
    it('renders the children', async () => expect(screen.getAllByRole('generic')[0]).toHaveTextContent('Child'));
  });
});
