import { createElement as h } from 'react';
import { render, screen } from '@not-govuk/component-test-helpers';
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
});
