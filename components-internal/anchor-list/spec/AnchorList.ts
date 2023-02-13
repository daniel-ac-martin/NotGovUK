import { createElement as h } from 'react';
import { render, screen } from '@not-govuk/component-test-helpers';
import AnchorList, { AnchorListProps } from '../src/AnchorList';

describe('AnchorList', () => {
  const minimalProps = {
    items: [
      { href: '#', text: 'One' },
      { href: '#', text: 'Two' },
      { href: '#', text: 'Three' }
    ]
  };

  describe('when given minimal valid props', () => {
    beforeEach(async () => {
      render(h(AnchorList, minimalProps));
    });

    it('renders a list', async () => expect(screen.getByRole('list')).toBeInTheDocument());
    it('with as many links as were provided', async () => expect(screen.getAllByRole('link')).toHaveLength(3));
    it('with the correct text for the 1st link', async () => expect(screen.getAllByRole('link')[0]).toHaveTextContent('One'));
    it('with the correct text for the 2nd link', async () => expect(screen.getAllByRole('link')[1]).toHaveTextContent('Two'));
    it('with the correct text for the 3rd link', async () => expect(screen.getAllByRole('link')[2]).toHaveTextContent('Three'));
  });

  describe('when given all valid props', () => {
    const props: AnchorListProps = {
      ...minimalProps,
      as: 'ol'
    };

    beforeEach(async () => {
      render(h(AnchorList, props));
    });

    it('renders a list', async () => expect(screen.getByRole('list')).toBeInTheDocument());
    it('with as many links as were provided', async () => expect(screen.getAllByRole('link')).toHaveLength(3));
    it('with the correct text for the 1st link', async () => expect(screen.getAllByRole('link')[0]).toHaveTextContent('One'));
    it('with the correct text for the 2nd link', async () => expect(screen.getAllByRole('link')[1]).toHaveTextContent('Two'));
    it('with the correct text for the 3rd link', async () => expect(screen.getAllByRole('link')[2]).toHaveTextContent('Three'));
  });
});
