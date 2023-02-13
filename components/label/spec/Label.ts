import { createElement as h } from 'react';
import { render, screen } from '@not-govuk/component-test-helpers';
import Label from '../src/Label';

describe('Label', () => {
  describe('when given valid props', () => {
    beforeEach(async () => {
      render(h(Label, { htmlFor: 'field-id' }, 'My label'));
    });

    it('renders a label', async () => expect(screen.getByText('My label')).toBeInTheDocument());
    it('that points to the provided ID', async () => expect(screen.getByText('My label')).toHaveAttribute('for', 'field-id'));
  });
});
