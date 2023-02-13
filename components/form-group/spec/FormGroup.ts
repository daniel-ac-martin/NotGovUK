import { createElement as h } from 'react';
import { render, screen } from '@not-govuk/component-test-helpers';
import FormGroup from '../src/FormGroup';

describe('FormGroup', () => {
  const minimalProps = {
    id: 'my-field',
    label: 'My field'
  };

  describe('when given minimal valid props', () => {
    beforeEach(async () => {
      render(h(FormGroup, minimalProps, 'Child'));
    });

    it('renders a fieldset', async () => expect(screen.getByRole('group')).toBeInTheDocument());
    it('renders the label (as a legend)', async () => expect(screen.getByText('My field')).toBeInTheDocument());
    it('does NOT render a label', async () => expect(screen.queryByLabelText('My field')).toBeNull());
  });

  describe('when given all valid props', () => {
    const props = {
      ...minimalProps,
      error: 'My error',
      hint: 'My hint',
    };

    describe('NOT including a fieldId', () => {
      beforeEach(async () => {
        render(h(FormGroup, props, 'Child'));
      });

      it('renders a fieldset', async () => expect(screen.getByRole('group')).toBeInTheDocument());
      it('that is described by the error and the hint', async () => expect(screen.getByRole('group')).toHaveAccessibleDescription('My hint Error: My error'));
      it('renders the label (as a legend)', async () => expect(screen.getByText('My field')).toBeInTheDocument());
      it('does NOT render a label', async () => expect(screen.queryByLabelText('My field')).toBeNull());
    });

    describe('including a fieldId', () => {
      const props = {
        error: 'My error',
        fieldId: 'my-field-input',
        hint: 'My hint',
        id: 'my-field',
        label: 'My field'
      };
      beforeEach(async () => {
        render(h(FormGroup, props, 'Child'));
      });

      it('does NOT render a fieldset', async () => expect(screen.queryByRole('group')).toBeNull());
      it('renders the label', async () => expect(screen.getByText('My field')).toBeInTheDocument());
      it('renders the hint', async () => expect(screen.getByText('My hint')).toBeInTheDocument());
      it('renders the error', async () => expect(screen.getByText('My error')).toBeInTheDocument());
    });
  });
});
