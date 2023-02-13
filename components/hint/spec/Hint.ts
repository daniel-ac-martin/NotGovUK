import { createElement as h } from 'react';
import { render, screen } from '@not-govuk/component-test-helpers';
import Hint from '../src/Hint';

describe('Hint', () => {
  describe('when given valid props', () => {
    beforeEach(async () => {
      render(h(Hint, { id: 'field-id-hint' }, 'Hint text'));
    });

    it('renders the children', async () => expect(screen.getByText('Hint text')).toBeInTheDocument());
  });
});
