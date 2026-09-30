import { createElement as h } from 'react';
import { render, screen } from '@react-foundry/component-test-helpers';
import Textarea from '../src/Textarea';

describe('Textarea', () => {
  const minimalProps = {
    label: 'Description',
    name: 'desc',
  };

  describe('when given minimal valid props', () => {
    beforeEach(async () => {
      render(h(Textarea, minimalProps));
    });

    it('renders a textbox', async () => expect(screen.getByRole('textbox')).toBeInTheDocument());
    it('renders the label', async () => expect(screen.getByLabelText('Description')).toBeInTheDocument());
  });

  describe('when given all valid props', () => {
    const props = {
      ...minimalProps,
      error: 'Write a description',
      hint: 'Describe the thing'
    };
    beforeEach(async () => {
      render(h(Textarea, props));
    });

    it('renders a textbox', async () => expect(screen.getByRole('textbox')).toBeInTheDocument());
    it('renders the label', async () => expect(screen.getByLabelText('Description')).toBeInTheDocument());
    it('is described by the error and the hint', async () => expect(screen.getByLabelText('Description')).toHaveAccessibleDescription('Describe the thing Error: Write a description'));
  });

  describe('when the label is the page heading', () => {
    beforeEach(async () => {
      render(h(Textarea, { ...minimalProps, isPageHeading: true, labelSize: 'l' }));
    });

    it('renders the label inside a level 1 heading', async () => expect(screen.getByRole('heading', { level: 1 })).toContainElement(screen.getByText('Description')));
    it('sizes the label', async () => expect(screen.getByText('Description')).toHaveClass('govuk-label', 'govuk-label--l'));
    it('still labels the field', async () => expect(screen.getByLabelText('Description')).toBeInTheDocument());
  });
});
