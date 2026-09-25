import { createElement as h } from 'react';
import { render, screen } from '@react-foundry/component-test-helpers';
import FieldSet from '../src/FieldSet';

describe('FieldSet', () => {
  describe('when given valid props', () => {
    beforeEach(async () => {
      render(h(FieldSet, { legend: 'My legend' }, 'Child'));
    });

    it('renders an element', async () => expect(screen.getByRole('generic')).toBeInTheDocument());
    it('includes the legend provided', async () => expect(screen.getByRole('generic')).toHaveTextContent('My legend'));
    it('includes the children provided', async () => expect(screen.getByRole('generic')).toHaveTextContent('Child'));
  });

  describe('when given a legend size', () => {
    beforeEach(async () => {
      render(h(FieldSet, { legend: 'My legend', legendSize: 'm' }, 'Child'));
    });

    it('sizes the legend', async () => expect(screen.getByText('My legend')).toHaveClass('govuk-fieldset__legend', 'govuk-fieldset__legend--m'));
    it('does NOT render a heading', async () => expect(screen.queryByRole('heading')).toBeNull());
  });

  describe('when the legend is the page heading', () => {
    beforeEach(async () => {
      render(h(FieldSet, { isPageHeading: true, legend: 'My legend', legendSize: 'l' }, 'Child'));
    });

    it('renders the legend as a level 1 heading', async () => expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('My legend'));
    it('that has the heading class', async () => expect(screen.getByRole('heading', { level: 1 })).toHaveClass('govuk-fieldset__heading'));
    it('inside the sized legend', async () => expect(screen.getByRole('heading', { level: 1 }).parentElement).toHaveClass('govuk-fieldset__legend', 'govuk-fieldset__legend--l'));
  });
});
