import { createElement as h } from 'react';
import { render, screen } from '@not-govuk/component-test-helpers';
import Tabs from '../src/Tabs';

describe('Tabs', () => {
  const minimalProps = {
    items: [
      {
        id: 'a1',
        label: 'AAA',
        content: h('p', {}, 'A-content')
      },
      {
        id: 'b1',
        label: 'BBB',
        content: h('p', {}, 'B-content')
      },
      {
        id: 'c1',
        label: 'CCC',
        content: h('p', {}, 'C-content')
      }
    ]
  };

  describe('when given minimal valid props', () => {
    beforeEach(async () => {
      render(h(Tabs, minimalProps));
    });

    it('renders a list of tabs', async () => expect(screen.getByRole('tablist')).toBeInTheDocument());
    it('with the correct number of items', async () => expect(screen.getAllByRole('tab')).toHaveLength(3));
    it('with the 1st label', async () => expect(screen.getAllByRole('tab')[0]).toHaveTextContent('AAA'));
    it('with the 2nd label', async () => expect(screen.getAllByRole('tab')[1]).toHaveTextContent('BBB'));
    it('with the 3rd label', async () => expect(screen.getAllByRole('tab')[2]).toHaveTextContent('CCC'));
    it('renders the correct number of panels', async () => expect(screen.getAllByRole('tabpanel')).toHaveLength(3));
    it('with the 1st content', async () => expect(screen.getByLabelText('AAA')).toHaveTextContent('A-content'));
    it('with the 2nd content', async () => expect(screen.getByLabelText('BBB')).toHaveTextContent('B-content'));
    it('with the 3rd content', async () => expect(screen.getByLabelText('CCC')).toHaveTextContent('C-content'));
    it('shows the 1st panel', async () => expect(screen.getByLabelText('AAA')).not.toHaveClass('govuk-tabs__panel--hidden'));
    it('hides the 2nd panel', async () => expect(screen.getByLabelText('BBB')).toHaveClass('govuk-tabs__panel--hidden'));
    it('hides the 3rd panel', async () => expect(screen.getByLabelText('CCC')).toHaveClass('govuk-tabs__panel--hidden'));
  });
});
