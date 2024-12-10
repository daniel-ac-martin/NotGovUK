import { createElement as h } from 'react';
import { render, screen } from '@not-govuk/component-test-helpers';
import StandaloneInput from '../src/StandaloneInput';

describe('StandaloneInput', () => {
  const minimalProps = {
    name: 'message',
    label: 'Message'
  };

  describe('when given minimal valid props', () => {
    beforeEach(async () => {
      render(h(StandaloneInput, minimalProps));
    });

    it('renders a text field', async () => expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text'));
    it('renders the label', async () => expect(screen.getByLabelText('Message')).toBeInTheDocument());
  });

  describe('when given all valid props', () => {
    const props = {
      ...minimalProps,
      button: 'Send',
      error: 'Something went wrong',
      hint: 'What do you want to say?',
      width: 10
    };

    beforeEach(async () => {
      render(h(StandaloneInput, props));
    });

    it('renders a text field', async () => expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text'));
    it('renders the label', async () => expect(screen.getByLabelText('Message')).toBeInTheDocument());
  });
});
