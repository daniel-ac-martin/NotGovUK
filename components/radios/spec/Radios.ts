import { createElement as h } from 'react';
import { render, screen } from '@not-govuk/component-test-helpers';
import Radios from '../src/Radios';

describe('Radios', () => {
  describe('when given minimal valid props', () => {
    const props = {
      label: 'Where do you live?',
      name: 'where-do-you-live',
      options: [
        { value: 'england', label: 'England' },
        { value: 'scotland', label: 'Scotland' },
        { value: 'wales', label: 'Wales' },
        { value: 'northern-ireland', label: 'Northern Ireland' }
      ]
    };

    beforeEach(async () => {
      render(h(Radios, props));
    });

    it('renders a fieldset', async () => expect(screen.getByRole('group')).toBeInTheDocument());
    it('renders 4 radios', async () => expect(screen.getAllByRole('radio')).toHaveLength(4));
    it('renders the label', async () => expect(screen.getByRole('group')).toHaveTextContent('Where do you live?'));
    it('renders the 1st option', async () => expect(screen.getByRole('group')).toHaveTextContent('England'));
    it('renders the 2nd option', async () => expect(screen.getByRole('group')).toHaveTextContent('Scotland'));
    it('renders the 3rd option', async () => expect(screen.getByRole('group')).toHaveTextContent('Wales'));
    it('renders the 4th option', async () => expect(screen.getByRole('group')).toHaveTextContent('Northern Ireland'));
  });

  describe('when given all valid props', () => {
    const props = {
      label: 'Where do you live?',
      name: 'where-do-you-live',
      options: [
        { value: 'england', label: 'England', conditional: 'Conditional One' },
        { value: 'scotland', label: 'Scotland', conditional: 'Conditional Two' },
        { value: 'wales', label: 'Wales', conditional: 'Conditional Three' },
        { value: 'northern-ireland', label: 'Northern Ireland', conditional: 'Conditional Four' },
        'or',
        { value: 'abroad', label: 'None of the above', hint: 'I am a British citizen living abroad' }
      ],
      error: 'Select an option',
      hint: 'Select one.'
    };

    beforeEach(async () => {
      render(h(Radios, props));
    });

    it('renders a fieldset', async () => expect(screen.getByRole('group')).toBeInTheDocument());
    it('that is described by the error and the hint', async () => expect(screen.getByRole('group')).toHaveAccessibleDescription('Select one. Error: Select an option'));
    it('renders 5 radios', async () => expect(screen.getAllByRole('radio')).toHaveLength(5));
    it('renders the label', async () => expect(screen.getByRole('group')).toHaveTextContent('Where do you live?'));
    it('renders the 1st option', async () => expect(screen.getByRole('group')).toHaveTextContent('England'));
    it('renders the 2nd option', async () => expect(screen.getByRole('group')).toHaveTextContent('Scotland'));
    it('renders the 3rd option', async () => expect(screen.getByRole('group')).toHaveTextContent('Wales'));
    it('renders the 4th option', async () => expect(screen.getByRole('group')).toHaveTextContent('Northern Ireland'));
    it('renders the 5th option', async () => expect(screen.getByRole('group')).toHaveTextContent('None of the above'));
    it('renders the 5th option hint', async () => expect(screen.getByRole('group')).toHaveTextContent('I am a British citizen living abroad'));
    it('renders the 1st option\'s conditional', async () => expect(screen.getByRole('group')).toHaveTextContent('Conditional One'));
    it.skip('renders the 1st option\'s conditional as invisible', async () => expect(screen.getByText('Conditional One')).not.toBeVisible());
    it('renders the 2nd option\'s conditional', async () => expect(screen.getByRole('group')).toHaveTextContent('Conditional Two'));
    it('renders the 2nd option\'s conditional as visible', async () => expect(screen.getByText('Conditional Two')).toBeVisible());
    it('renders the 3rd option\'s conditional', async () => expect(screen.getByRole('group')).toHaveTextContent('Conditional Three'));
    it.skip('renders the 3rd option\'s conditional as invisible', async () => expect(screen.getByText('Conditional Three')).not.toBeVisible());
    it('renders the 4th option\'s conditional', async () => expect(screen.getByRole('group')).toHaveTextContent('Conditional Four'));
    it.skip('renders the 4th option\'s conditional as invisible', async () => expect(screen.getByText('Conditional Four')).not.toBeVisible());
  });
});
