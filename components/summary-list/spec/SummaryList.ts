import { createElement as h } from 'react';
import { render, screen } from '@not-govuk/component-test-helpers';
import SummaryList from '../src/SummaryList';

describe('SummaryList', () => {
  const minimalProps = {
    items: [
      { name: 'Item A', children: 'One' },
      { name: 'Item B', children: 'Two' },
      { name: 'Item C', children: 'Three' },
    ]
  };

  describe('when given minimal valid props', () => {
    beforeEach(async () => {
      render(h(SummaryList, minimalProps));
    });

    it('contains the name of the 1st item', async () => expect(screen.getByText('Item A')).toBeInTheDocument());
    it('contains the name of the 2nd item', async () => expect(screen.getByText('Item B')).toBeInTheDocument());
    it('contains the name of the 3rd item', async () => expect(screen.getByText('Item C')).toBeInTheDocument());
    it('contains the value of the 1st item', async () => expect(screen.getByText('One')).toBeInTheDocument());
    it('contains the value of the 2nd item', async () => expect(screen.getByText('Two')).toBeInTheDocument());
    it('contains the value of the 3rd item', async () => expect(screen.getByText('Three')).toBeInTheDocument());
  });

  describe('when given all valid props', () => {
    const props = {
      ...minimalProps,
      items: [
        { name: 'Item A', actions: [ { href: '/a', text: 'Change A' } ], children: 'One' },
        { name: 'Item B', actions: [ { href: '/b', text: 'Change B' } ], children: 'Two' },
        { name: 'Item C', actions: [ { href: '/c', text: 'Change C' } ], children: 'Three' },
      ]
    };

    beforeEach(async () => {
      render(h(SummaryList, props));
    });

    it('contains the name of the 1st item', async () => expect(screen.getByText('Item A')).toBeInTheDocument());
    it('contains the name of the 2nd item', async () => expect(screen.getByText('Item B')).toBeInTheDocument());
    it('contains the name of the 3rd item', async () => expect(screen.getByText('Item C')).toBeInTheDocument());
    it('contains the value of the 1st item', async () => expect(screen.getByText('One')).toBeInTheDocument());
    it('contains the value of the 2nd item', async () => expect(screen.getByText('Two')).toBeInTheDocument());
    it('contains the value of the 3rd item', async () => expect(screen.getByText('Three')).toBeInTheDocument());
    it('represents all the actions as links', async () => expect(screen.getAllByRole('link')).toHaveLength(3));
    it('contains the text of the 1st action', async () => expect(screen.getAllByRole('link')[0]).toHaveTextContent('Change A'));
    it('contains the text of the 2nd action', async () => expect(screen.getAllByRole('link')[1]).toHaveTextContent('Change B'));
    it('contains the text of the 3rd action', async () => expect(screen.getAllByRole('link')[2]).toHaveTextContent('Change C'));
    it('links to the href of the 1st action', async () => expect(screen.getAllByRole('link')[0]).toHaveAttribute('href', '/a'));
    it('links to the href of the 2nd action', async () => expect(screen.getAllByRole('link')[1]).toHaveAttribute('href', '/b'));
    it('links to the href of the 3rd action', async () => expect(screen.getAllByRole('link')[2]).toHaveAttribute('href', '/c'));
  });
});
