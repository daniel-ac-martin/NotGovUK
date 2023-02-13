import { createElement as h } from 'react';
import { render, screen } from '@not-govuk/component-test-helpers';
import WarningText from '../src/WarningText';

describe('WarningText', () => {
  const minimalProps = {};

  describe('when given valid props', () => {
    beforeEach(async () => {
      render(h(WarningText, minimalProps, 'Child'));
    });

    it('renders an element', async () => expect(screen.getAllByRole('generic')[0]).toBeInTheDocument());
    it('contains the child provided', async () => expect(screen.getAllByRole('generic')[0]).toHaveTextContent('Child'));
  });
});
