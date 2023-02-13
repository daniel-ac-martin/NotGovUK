import { createElement as h } from 'react';
import { render, screen } from '@not-govuk/component-test-helpers';
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
    const props = {
      label: 'Which types of waste do you transport?',
      name: 'waste',
      options: [
        { value: 'carcasses', label: 'Waste from animal carcasses', conditional: 'Conditional One' },
        { value: 'mines', label: 'Waste from mines or quarries', conditional: 'Conditional Two', selected: true },
        { value: 'farm', label: 'Farm or agricultural waste', conditional: 'Conditional Three' },
        'or',
        { value: 'abroad', label: 'None of the above', hint: 'I am NOT a waste carrier', exclusive: true }
      ],
      error: 'Select an option',
      hint: 'Select all that apply.'
    };

    beforeEach(async () => {
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
    it('renders the 1st option\'s conditional', async () => expect(screen.getByRole('group')).toHaveTextContent('Conditional One'));
    it.skip('renders the 1st option\'s conditional as invisible', async () => expect(screen.getByText('Conditional One')).not.toBeVisible());
    it('renders the 2nd option\'s conditional', async () => expect(screen.getByRole('group')).toHaveTextContent('Conditional Two'));
    it('renders the 2nd option\'s conditional as visible', async () => expect(screen.getByText('Conditional Two')).toBeVisible());
    it('renders the 3rd option\'s conditional', async () => expect(screen.getByRole('group')).toHaveTextContent('Conditional Three'));
    it.skip('renders the 3rd option\'s conditional as invisible', async () => expect(screen.getByText('Conditional Three')).not.toBeVisible());
  });
});
