import { createElement as h } from 'react';
import { render, screen } from '@react-foundry/component-test-helpers';
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

  describe('when given label class modifiers', () => {
    describe('including a fieldId', () => {
      beforeEach(async () => {
        render(h(FormGroup, { ...minimalProps, fieldId: 'my-field-input', labelClassModifiers: 'm' }, 'Child'));
      });

      it('applies them to the label', async () => expect(screen.getByText('My field')).toHaveClass('govuk-label', 'govuk-label--m'));
      it('does NOT render a heading', async () => expect(screen.queryByRole('heading')).toBeNull());
    });

    describe('NOT including a fieldId', () => {
      beforeEach(async () => {
        render(h(FormGroup, { ...minimalProps, labelClassModifiers: 'm' }, 'Child'));
      });

      it('applies them to the legend', async () => expect(screen.getByText('My field')).toHaveClass('govuk-fieldset__legend', 'govuk-fieldset__legend--m'));
      it('does NOT render a heading', async () => expect(screen.queryByRole('heading')).toBeNull());
    });
  });

  describe('when given a heading', () => {
    describe('including a fieldId', () => {
      beforeEach(async () => {
        render(h(FormGroup, { ...minimalProps, fieldId: 'my-field-input', labelHeading: 'h1', labelClassModifiers: 'xl' }, 'Child'));
      });

      it('renders the label as a level 1 heading', async () => expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('My field'));
      it('still applies the modifiers to the label', async () => expect(screen.getByText('My field')).toHaveClass('govuk-label', 'govuk-label--xl'));
    });

    describe('NOT including a fieldId', () => {
      beforeEach(async () => {
        render(h(FormGroup, { ...minimalProps, labelHeading: 'h1', labelClassModifiers: 'xl' }, 'Child'));
      });

      it('renders the legend as a level 1 heading', async () => expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('My field'));
      it('still applies the modifiers to the legend', async () => expect(screen.getByRole('heading', { level: 1 }).parentElement).toHaveClass('govuk-fieldset__legend', 'govuk-fieldset__legend--xl'));
      it('names the fieldset', async () => expect(screen.getByRole('group', { name: 'My field' })).toBeInTheDocument());
    });
  });

  describe('when given a caption', () => {
    describe('including a fieldId', () => {
      beforeEach(async () => {
        render(h(FormGroup, { ...minimalProps, fieldId: 'my-field-input', labelCaption: 'About you', labelHeading: 'h1' }, 'Child'));
      });

      it('renders the caption', async () => expect(screen.getByText('About you')).toBeInTheDocument());
      it('outside the label', async () => expect(screen.getByText('About you').closest('label')).toBeNull());
      it('sized to match the label', async () => expect(screen.getByText('About you')).toHaveClass('govuk-caption-l'));
    });

    describe('NOT including a fieldId', () => {
      beforeEach(async () => {
        render(h(FormGroup, { ...minimalProps, labelCaption: 'About you', labelHeading: 'h1' }, 'Child'));
      });

      it('renders the caption', async () => expect(screen.getByText('About you')).toBeInTheDocument());
      it('outside the fieldset', async () => expect(screen.getByText('About you').closest('fieldset')).toBeNull());
      it('so that it does NOT name the group', async () => expect(screen.getByRole('group')).toHaveAccessibleName('My field'));
    });

    describe('with a lower level of heading', () => {
      beforeEach(async () => {
        render(h(FormGroup, { ...minimalProps, labelCaption: 'About you', labelHeading: 'h2' }, 'Child'));
      });

      it('sizes the caption to match the label', async () => expect(screen.getByText('About you')).toHaveClass('govuk-caption-m'));
    });

    describe('but no heading at all', () => {
      beforeEach(async () => {
        render(h(FormGroup, { ...minimalProps, labelCaption: 'About you' }, 'Child'));
      });

      it('still renders the caption', async () => expect(screen.getByText('About you')).toBeInTheDocument());
      it('sized to match the unsized label', async () => expect(screen.getByText('About you')).toHaveClass('govuk-caption-m'));
    });

    describe('alongside label modifiers', () => {
      beforeEach(async () => {
        render(h(FormGroup, { ...minimalProps, labelCaption: 'About you', labelClassModifiers: 'm', labelHeading: 'h1' }, 'Child'));
      });

      it('sizes the caption to match them', async () => expect(screen.getByText('About you')).toHaveClass('govuk-caption-m'));
    });
  });
});
