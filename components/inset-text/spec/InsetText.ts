import { createElement as h } from 'react';
import { render, screen } from '@not-govuk/component-test-helpers';
import InsetText from '../src/InsetText';

describe('InsetText', () => {
  describe('when given valid props', () => {
    beforeEach(async () => {
      render(h(InsetText, {}, 'Child'));
    });

    it('renders the children', async () => expect(screen.getByText('Child')).toBeInTheDocument());
  });
});
