import { createElement as h } from 'react';
import { render, screen } from '@react-foundry/component-test-helpers';
import FieldSet, { FieldSetProps } from '../src/FieldSet';

describe('FieldSet', () => {
  const minimalProps: FieldSetProps = {
    legend: 'My legend'
  };

  describe('when given minimal valid props', () => {
    beforeEach(async () => {
      render(h(FieldSet, minimalProps, 'Child'));
    });

    it('renders an element', async () => expect(screen.getByRole('generic')).toBeInTheDocument());
    it('includes the legend provided', async () => expect(screen.getByRole('generic')).toHaveTextContent('My legend'));
    it('includes the children provided', async () => expect(screen.getByRole('generic')).toHaveTextContent('Child'));
    it('and the legend is NOT a heading', async () => expect(screen.queryByRole('heading')).toBeNull());
  });

  describe('when given all valid props', () => {
    const props: FieldSetProps = {
      ...minimalProps,
      legendClassModifiers: 's',
      legendHeading: 'h1'
    };

    beforeEach(async () => {
      render(h(FieldSet, props, 'Child'));
    });

    it('includes the legend provided', async () => expect(screen.getByRole('generic')).toHaveTextContent('My legend'));
    it('includes the children provided', async () => expect(screen.getByRole('generic')).toHaveTextContent('Child'));
    it('renders the legend as a level 1 heading', async () => expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('My legend'));
    it('sized by the modifiers given', async () => (
      expect(screen.getByRole('heading', { level: 1 }).parentElement).toHaveClass('govuk-fieldset__legend--s')
    ));
  });

  describe('when given a heading without modifiers', () => {
    beforeEach(async () => {
      render(h(FieldSet, { ...minimalProps, legendHeading: 'h1' }, 'Child'));
    });

    it('sizes the legend as GOV.UK sizes an h1', async () => (
      expect(screen.getByRole('heading', { level: 1 }).parentElement).toHaveClass('govuk-fieldset__legend--l')
    ));
  });

  describe('when the heading is a lower level', () => {
    beforeEach(async () => {
      render(h(FieldSet, { ...minimalProps, legendHeading: 'h2' }, 'Child'));
    });

    it('renders a level 2 heading', async () => expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('My legend'));
    it('sizing the legend as GOV.UK sizes an h2', async () => (
      expect(screen.getByRole('heading', { level: 2 }).parentElement).toHaveClass('govuk-fieldset__legend--m')
    ));
  });

  describe('when the heading has no level to read', () => {
    beforeEach(async () => {
      render(h(FieldSet, { ...minimalProps, legendHeading: 'div' }, 'Child'));
    });

    it('still wraps the legend', async () => expect(screen.getByText('My legend').parentElement).toHaveClass('govuk-fieldset__legend'));
    it('but guesses no size for it', async () => expect(screen.getByText('My legend').parentElement?.className).toBe('govuk-fieldset__legend'));
  });
});
