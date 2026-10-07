import type { ChangeEvent } from 'react';

import { createElement as h } from 'react';
import { jest } from '@jest/globals';
import { render, screen, userEvent } from '@react-foundry/component-test-helpers';
import Checkboxes from '../src/Checkboxes';

describe('Checkboxes', () => {
  describe('when given minimal valid props', () => {
    const props = {
      label: 'Which types of waste do you transport?',
      name: 'waste',
      options: [
        { value: 'carcasses', label: 'Waste from animal carcasses' },
        { value: 'mines', label: 'Waste from mines or quarries' },
        { value: 'farm', label: 'Farm or agricultural waste' }
      ]
    };

    beforeEach(async () => {
      render(h(Checkboxes, props));
    });

    it('renders a fieldset', async () => expect(screen.getByRole('group')).toBeInTheDocument());
    it('renders 3 checkboxes', async () => expect(screen.getAllByRole('checkbox')).toHaveLength(3));
    it('renders the label', async () => expect(screen.getByRole('group')).toHaveTextContent('Which types of waste do you transport?'));
    it('renders the 1st option', async () => expect(screen.getByRole('group')).toHaveTextContent('Waste from animal carcasses'));
    it('renders the 2nd option', async () => expect(screen.getByRole('group')).toHaveTextContent('Waste from mines or quarries'));
    it('renders the 3rd option', async () => expect(screen.getByRole('group')).toHaveTextContent('Farm or agricultural waste'));
  });

  describe('when given all valid props', () => {
    const onChange = jest.fn<(e: ChangeEvent<HTMLInputElement>) => void>();
    const changed = () => onChange.mock.calls.map(v => v[0].target.value);
    const props = {
      label: 'Which types of waste do you transport?',
      name: 'waste',
      options: [
        { value: 'carcasses', label: 'Waste from animal carcasses', conditional: 'Conditional One' },
        { value: 'mines', label: 'Waste from mines or quarries', conditional: 'Conditional Two', selected: true },
        { value: 'farm', label: 'Farm or agricultural waste', conditional: 'Conditional Three', content: h('a', { href: '/guidance' }, 'Waste guidance') },
        'or',
        { value: 'abroad', label: 'None of the above', hint: 'I am NOT a waste carrier', exclusive: true }
      ],
      classBlock: 'my-checkboxes',
      error: 'Select an option',
      hint: 'Select all that apply.',
      onChange
    };

    beforeEach(async () => {
      onChange.mockClear();
      render(h(Checkboxes, props));
    });

    it('renders a fieldset', async () => expect(screen.getByRole('group')).toBeInTheDocument());
    it('that is described by the error and the hint', async () => expect(screen.getByRole('group')).toHaveAccessibleDescription('Select all that apply. Error: Select an option'));
    it('renders 4 checkboxes', async () => expect(screen.getAllByRole('checkbox')).toHaveLength(4));
    it('renders the label', async () => expect(screen.getByRole('group')).toHaveTextContent('Which types of waste do you transport?'));
    it('renders the 1st option', async () => expect(screen.getByRole('group')).toHaveTextContent('Waste from animal carcasses'));
    it('renders the 2nd option', async () => expect(screen.getByRole('group')).toHaveTextContent('Waste from mines or quarries'));
    it('renders the 3rd option', async () => expect(screen.getByRole('group')).toHaveTextContent('Farm or agricultural waste'));
    it('renders the 4th option', async () => expect(screen.getByRole('group')).toHaveTextContent('None of the above'));
    it('renders the 5th option hint', async () => expect(screen.getByRole('group')).toHaveTextContent('I am NOT a waste carrier'));
    it('describes the hinted option by its hint', async () => (
      expect(screen.getByRole('checkbox', { name: 'None of the above' })).toHaveAccessibleDescription('I am NOT a waste carrier')
    ));
    it('does NOT describe an option without a hint', async () => (
      expect(screen.getByRole('checkbox', { name: 'Waste from animal carcasses' })).toHaveAccessibleDescription('')
    ));
    it('renders the 1st option\'s conditional', async () => expect(screen.getByRole('group')).toHaveTextContent('Conditional One'));
    it.skip('renders the 1st option\'s conditional as invisible', async () => expect(screen.getByText('Conditional One')).not.toBeVisible());
    it('renders the 2nd option\'s conditional', async () => expect(screen.getByRole('group')).toHaveTextContent('Conditional Two'));
    it('renders the 2nd option\'s conditional as visible', async () => expect(screen.getByText('Conditional Two')).toBeVisible());
    it('renders the 3rd option\'s conditional', async () => expect(screen.getByRole('group')).toHaveTextContent('Conditional Three'));
    it.skip('renders the 3rd option\'s conditional as invisible', async () => expect(screen.getByText('Conditional Three')).not.toBeVisible());
    it('renders the 3rd option\'s content', async () => expect(screen.getByRole('link', { name: 'Waste guidance' })).toBeInTheDocument());
    it('renders the content outside of the label', async () => (
      expect(screen.getByRole('link', { name: 'Waste guidance' }).closest('label')).toBeNull()
    ));
    it('leaves the name of the option to its label', async () => (
      expect(screen.getByRole('checkbox', { name: 'Farm or agricultural waste' })).toHaveAccessibleName('Farm or agricultural waste')
    ));
    it('applies the class block to the inputs', async () => (
      expect(screen.getByRole('checkbox', { name: 'None of the above' })).toHaveClass('my-checkboxes__input')
    ));
    it('applies the class block to the items', async () => (
      expect(screen.getByRole('checkbox', { name: 'None of the above' }).parentElement).toHaveClass('my-checkboxes__item')
    ));
    it('applies the class block to the hints', async () => (
      expect(screen.getByText('I am NOT a waste carrier')).toHaveClass('my-checkboxes__hint')
    ));
    it('applies the class block to the dividers', async () => expect(screen.getByText('or')).toHaveClass('my-checkboxes__divider'));
    it('applies the class block to the content', async () => (
      expect(screen.getByRole('link', { name: 'Waste guidance' }).parentElement).toHaveClass('my-checkboxes__content')
    ));

    describe('and the exclusive option is checked', () => {
      beforeEach(async () => userEvent.click(screen.getByRole('checkbox', { name: 'None of the above' })));

      it('checks it', async () => expect(screen.getByRole('checkbox', { name: 'None of the above' })).toBeChecked());
      it('unchecks the option that was selected', async () => (
        expect(screen.getByRole('checkbox', { name: 'Waste from mines or quarries' })).not.toBeChecked()
      ));
      it('collapses the conditional of the option it unchecked', async () => (
        expect(screen.getByRole('checkbox', { name: 'Waste from mines or quarries' })).toHaveAttribute('aria-expanded', 'false')
      ));
      it('tells the caller about the box it cleared as well as the one clicked', async () => (
        expect(changed()).toEqual(['abroad', 'mines'])
      ));
    });

    describe('and another option is checked while the exclusive one is', () => {
      beforeEach(async () => {
        await userEvent.click(screen.getByRole('checkbox', { name: 'None of the above' }));
        await userEvent.click(screen.getByRole('checkbox', { name: 'Farm or agricultural waste' }));
      });

      it('checks it', async () => expect(screen.getByRole('checkbox', { name: 'Farm or agricultural waste' })).toBeChecked());
      it('unchecks the exclusive option', async () => (
        expect(screen.getByRole('checkbox', { name: 'None of the above' })).not.toBeChecked()
      ));
      it('expands its conditional', async () => (
        expect(screen.getByRole('checkbox', { name: 'Farm or agricultural waste' })).toHaveAttribute('aria-expanded', 'true')
      ));
      it('tells the caller about the exclusive box it cleared', async () => (
        expect(changed()).toEqual(['abroad', 'mines', 'farm', 'abroad'])
      ));
    });
  });

  describe('when composed from its container and items', () => {
    beforeEach(async () => {
      render(
        h(Checkboxes.Container, { id: 'waste', label: 'Which types of waste do you transport?' }, [
          h(Checkboxes.Item, { key: 'a', id: 'waste-mines', name: 'waste', value: 'mines', label: 'Waste from mines or quarries', hint: 'Including spoil' }),
          h(Checkboxes.Divider, { key: 'b' }, 'or'),
          h(Checkboxes.Item, { key: 'c', id: 'waste-none', name: 'waste', value: 'none', label: 'None of the above' })
        ])
      );
    });

    it('renders a single fieldset', async () => expect(screen.getAllByRole('group')).toHaveLength(1));
    it('renders the label', async () => expect(screen.getByRole('group')).toHaveTextContent('Which types of waste do you transport?'));
    it('renders a checkbox for each item', async () => expect(screen.getAllByRole('checkbox')).toHaveLength(2));
    it('names each checkbox by its label', async () => (
      expect(screen.getByRole('checkbox', { name: 'None of the above' })).toBeInTheDocument()
    ));
    it('takes the hint id from the item id', async () => expect(screen.getByText('Including spoil')).toHaveAttribute('id', 'waste-mines-hint'));
    it('describes an item by its hint', async () => (
      expect(screen.getByRole('checkbox', { name: 'Waste from mines or quarries' })).toHaveAccessibleDescription('Including spoil')
    ));
    it('renders the divider', async () => expect(screen.getByText('or')).toHaveClass('govuk-checkboxes__divider'));
  });
});
