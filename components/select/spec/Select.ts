import { createElement as h } from 'react';
import { render, screen } from '@not-govuk/component-test-helpers';
import Select from '../src/Select';

describe('Select', () => {
  const minimalProps = {
    label: 'Sort by',
    name: 'sort',
    options: [
      { value: 'published', label: 'Recently published' },
      { value: 'updated', label: 'Recently updated', selected: true },
      { value: 'views', label: 'Most views' },
      { value: 'comments', label: 'Most comments' }
    ]
  };

  describe('when given minimal valid props', () => {
    beforeEach(async () => {
      render(h(Select, minimalProps));
    });

    it('renders a select', async () => expect(screen.getByRole('combobox')).toBeInTheDocument());
    it('renders the options as options', async () => expect(screen.getAllByRole('option')).toHaveLength(4));
    it('renders the label', async () => expect(screen.getByLabelText('Sort by')).toBeInTheDocument());
  });

  describe('when given all valid props', () => {
    const props = {
      ...minimalProps,
      error: 'Pick at least one',
      hint: 'Pick some',
      multiple: true
    };
    beforeEach(async () => {
      render(h(Select, props));
    });

    it('renders a multi-select', async () => expect(screen.getByRole('listbox')).toBeInTheDocument());
    it('renders the options as options', async () => expect(screen.getAllByRole('option')).toHaveLength(4));
    it('renders the label', async () => expect(screen.getByLabelText('Sort by')).toBeInTheDocument());
    it('is described by the error and the hint', async () => expect(screen.getByLabelText('Sort by')).toHaveAccessibleDescription('Pick some Error: Pick at least one'));
  });
});
