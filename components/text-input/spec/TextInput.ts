import { createElement as h } from 'react';
import { render, screen } from '@not-govuk/component-test-helpers';
import TextInput from '../src/TextInput';

describe('TextInput', () => {
  const minimalProps = {
    label: 'Name',
    name: 'name',
  };

  describe('when given minimal valid props', () => {
    beforeEach(async () => {
      render(h(TextInput, minimalProps));
    });

    it('renders a text field', async () => expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text'));
    it('renders the label', async () => expect(screen.getByLabelText('Name')).toBeInTheDocument());
  });

  describe('when given all valid props', () => {
    const props = {
      ...minimalProps,
      error: 'Enter your full name',
      hint: 'Your full name'
    };
    beforeEach(async () => {
      render(h(TextInput, props));
    });

    it('renders a text field', async () => expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text'));
    it('renders the label', async () => expect(screen.getByLabelText('Name')).toBeInTheDocument());
    it('is described by the error and the hint', async () => expect(screen.getByLabelText('Name')).toHaveAccessibleDescription('Your full name Error: Enter your full name'));
  });
});
