import { createElement as h } from 'react';
import { render, screen } from '@not-govuk/component-test-helpers';
import DateInput from '../src/DateInput';

describe('DateInput', () => {
  const minimalProps = {
    name: 'my-date',
    label: 'My date'
  };

  describe('when given minimal valid props', () => {
    beforeEach(async () => {
      render(h(DateInput, minimalProps));
    });

    it('renders a form-group', async () => expect(screen.getByRole('group')).toBeInTheDocument());
    it('contains the label', async () => expect(screen.getByRole('group')).toHaveTextContent('My date'));
  });

  describe('when given all valid props', () => {
    const props = {
      ...minimalProps,
      error: 'Date must be in the past',
      hint: 'The day you were born'
    };
    beforeEach(async () => {
      render(h(DateInput, props));
    });

    it('renders a form-group', async () => expect(screen.getByRole('group')).toBeInTheDocument());
    it('that is described by the error and the hint', async () => expect(screen.getByRole('group')).toHaveAccessibleDescription('The day you were born Error: Date must be in the past'));
    it('contains the label', async () => expect(screen.getByRole('group')).toHaveTextContent('My date'));
  });
});
