import { createElement as h } from 'react';
import { render, screen } from '@react-foundry/component-test-helpers';
import Select, { SelectProps } from '../src/Select';

describe('Select', () => {
  const minimalProps: SelectProps = {
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
    const props: SelectProps = {
      ...minimalProps,
      error: 'Pick at least one',
      hint: 'Pick some',
      labelHeading: 'h1',
      labelClassModifiers: 'm',
      multiple: true
    };
    beforeEach(async () => {
      render(h(Select, props));
    });

    it('renders a multi-select', async () => expect(screen.getByRole('listbox')).toBeInTheDocument());
    it('renders the options as options', async () => expect(screen.getAllByRole('option')).toHaveLength(4));
    it('renders the label', async () => expect(screen.getByLabelText('Sort by')).toBeInTheDocument());
    it('is described by the error and the hint', async () => expect(screen.getByLabelText('Sort by')).toHaveAccessibleDescription('Pick some Error: Pick at least one'));
    it('renders the label as a level 1 heading', async () => expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Sort by'));
  });
});
