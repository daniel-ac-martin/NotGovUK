import { createElement as h } from 'react';
import { render, screen } from '@react-foundry/component-test-helpers';
import Label, { LabelProps } from '../src/Label';

describe('Label', () => {
  const minimalProps: LabelProps = {
    htmlFor: 'field-id'
  };

  describe('when given minimal valid props', () => {
    beforeEach(async () => {
      render(h(Label, minimalProps, 'My label'));
    });

    it('renders a label', async () => expect(screen.getByText('My label')).toBeInTheDocument());
    it('that points to the provided ID', async () => expect(screen.getByText('My label')).toHaveAttribute('for', 'field-id'));
    it('and is NOT a heading', async () => expect(screen.queryByRole('heading')).toBeNull());
  });

  describe('when given all valid props', () => {
    const props: LabelProps = {
      ...minimalProps,
      classModifiers: 's',
      heading: 'h1'
    };

    beforeEach(async () => {
      render(h(Label, props, 'My label'));
    });

    it('renders a label', async () => expect(screen.getByText('My label')).toBeInTheDocument());
    it('that points to the provided ID', async () => expect(screen.getByText('My label')).toHaveAttribute('for', 'field-id'));
    it('within a level 1 heading', async () => expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('My label'));
    it('sized by the modifiers given', async () => expect(screen.getByText('My label')).toHaveClass('govuk-label--s'));
  });

  describe('when given a heading without modifiers', () => {
    beforeEach(async () => {
      render(h(Label, { ...minimalProps, heading: 'h1' }, 'My label'));
    });

    it('sizes the label as GOV.UK sizes an h1', async () => expect(screen.getByText('My label')).toHaveClass('govuk-label--l'));
  });

  describe('when the heading is a lower level', () => {
    beforeEach(async () => {
      render(h(Label, { ...minimalProps, heading: 'h2' }, 'My label'));
    });

    it('renders a level 2 heading', async () => expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('My label'));
    it('sizing the label as GOV.UK sizes an h2', async () => expect(screen.getByText('My label')).toHaveClass('govuk-label--m'));
  });

  describe('when the heading has no level to read', () => {
    beforeEach(async () => {
      render(h(Label, { ...minimalProps, heading: 'div' }, 'My label'));
    });

    it('still wraps the label', async () => expect(screen.getByText('My label').parentElement).toHaveClass('govuk-label-wrapper'));
    it('but guesses no size for it', async () => expect(screen.getByText('My label').className).toBe('govuk-label'));
  });
});
