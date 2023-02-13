import { createElement as h } from 'react';
import { render, screen } from '@not-govuk/component-test-helpers';
import FieldSet from '../src/FieldSet';

describe('FieldSet', () => {
  describe('when given valid props', () => {
    beforeEach(async () => {
      render(h(FieldSet, { legend: 'My legend' }, 'Child'));
    });

    it('renders an element', async () => expect(screen.getByRole('generic')).toBeInTheDocument());
    it('includes the legend provided', async () => expect(screen.getByRole('generic')).toHaveTextContent('My legend'));
    it('includes the children provided', async () => expect(screen.getByRole('generic')).toHaveTextContent('Child'));
  });
});
