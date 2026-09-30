import { createElement as h } from 'react';
import { render, screen } from '@react-foundry/component-test-helpers';
import Label from '../src/Label';

describe('Label', () => {
  describe('when given valid props', () => {
    beforeEach(async () => {
      render(h(Label, { htmlFor: 'field-id' }, 'My label'));
    });

    it('renders a label', async () => expect(screen.getByText('My label')).toBeInTheDocument());
    it('that points to the provided ID', async () => expect(screen.getByText('My label')).toHaveAttribute('for', 'field-id'));
  });

  describe('when the label is the page heading', () => {
    beforeEach(async () => {
      render(h(Label, { classModifiers: 'l', htmlFor: 'field-id', isPageHeading: true }, 'My label'));
    });

    it('renders a level 1 heading', async () => expect(screen.getByRole('heading', { level: 1 })).toHaveClass('govuk-label-wrapper'));
    it('that contains the label', async () => expect(screen.getByRole('heading', { level: 1 })).toContainElement(screen.getByText('My label')));
    it('renders the label with its size', async () => expect(screen.getByText('My label')).toHaveClass('govuk-label', 'govuk-label--l'));
    it('that points to the provided ID', async () => expect(screen.getByText('My label')).toHaveAttribute('for', 'field-id'));
  });
});
