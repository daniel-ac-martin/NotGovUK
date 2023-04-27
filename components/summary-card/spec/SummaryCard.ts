import { createElement as h } from 'react';
import { render, screen } from '@not-govuk/component-test-helpers';
import SummaryCard from '../src/SummaryCard';

describe('SummaryCard', () => {
  const minimalProps = {
    title: 'Card title'
  };

  describe('when given minimal valid props', () => {
    beforeEach(async () => {
      render(h(SummaryCard, minimalProps));
    });

    it('renders a heading', async () => expect(screen.getByRole('heading')).toBeInTheDocument());
    it('has a heading with the text provided', async () => expect(screen.getByRole('heading')).toHaveTextContent('Card title'));
  });

  describe('when given all valid props', () => {
    const props = {
      ...minimalProps,
      actions: [
        { href: '/one', text: 'One' },
        { href: '/two', text: 'Two' },
        { href: '/three', text: 'Three' }
      ]
    };

    beforeEach(async () => {
      render(h(SummaryCard, props));
    });

    it('renders a heading', async () => expect(screen.getByRole('heading')).toBeInTheDocument());
    it('has a heading with the text provided', async () => expect(screen.getByRole('heading')).toHaveTextContent('Card title'));
    it('renders a list', async () => expect(screen.getByRole('list')).toBeInTheDocument());
    it('contains the same number of items as were given to it', async () => expect(screen.getAllByRole('listitem')).toHaveLength(3));
    it('represents all the items as links', async () => expect(screen.getAllByRole('link')).toHaveLength(3));
    it('contains the text of the 1st item', async () => expect(screen.getAllByRole('link')[0]).toHaveTextContent('One'));
    it('contains the text of the 2nd item', async () => expect(screen.getAllByRole('link')[1]).toHaveTextContent('Two'));
    it('contains the text of the 3rd item', async () => expect(screen.getAllByRole('link')[2]).toHaveTextContent('Three'));
    it('links to the href of the 1st item', async () => expect(screen.getAllByRole('link')[0]).toHaveAttribute('href', '/one'));
    it('links to the href of the 2nd item', async () => expect(screen.getAllByRole('link')[1]).toHaveAttribute('href', '/two'));
    it('links to the href of the 3rd item', async () => expect(screen.getAllByRole('link')[2]).toHaveAttribute('href', '/three'));
  });
});
