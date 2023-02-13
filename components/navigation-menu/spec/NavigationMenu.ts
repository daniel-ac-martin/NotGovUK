import { createElement as h } from 'react';
import { render, screen } from '@not-govuk/component-test-helpers';
import NavigationMenu from '../src/NavigationMenu';

describe('NavigationMenu', () => {
  const minimalProps = {
    items: [
      { href: '#', text: 'One' },
      { href: '#', text: 'Two' },
      { href: '#', text: 'Three' }
    ]
  };

  describe('when given minimal valid props', () => {
    beforeEach(async () => {
      render(h(NavigationMenu, minimalProps));
    });

    it('renders a navigation block', async () => expect(screen.getByRole('navigation')).toBeInTheDocument());
    it('renders a list', async () => expect(screen.getByRole('list')).toBeInTheDocument());
    it('with as many items as were provided', async () => expect(screen.getAllByRole('listitem')).toHaveLength(3));
    it('which are all links', async () => expect(screen.getAllByRole('link')).toHaveLength(3));
    it('with the correct text for the 1st link', async () => expect(screen.getAllByRole('link')[0]).toHaveTextContent('One'));
    it('with the correct text for the 2nd link', async () => expect(screen.getAllByRole('link')[1]).toHaveTextContent('Two'));
    it('with the correct text for the 3rd link', async () => expect(screen.getAllByRole('link')[2]).toHaveTextContent('Three'));
  });

  describe('when given all valid props', () => {
    const props = {
      ...minimalProps,
      classModifiers: 'horizontal',
    };

    beforeEach(async () => {
      render(h(NavigationMenu, props));
    });

    it('renders a navigation block', async () => expect(screen.getByRole('navigation')).toBeInTheDocument());
    it('renders a list', async () => expect(screen.getByRole('list')).toBeInTheDocument());
    it('with as many items as were provided', async () => expect(screen.getAllByRole('listitem')).toHaveLength(3));
    it('which are all links', async () => expect(screen.getAllByRole('link')).toHaveLength(3));
    it('with the correct text for the 1st link', async () => expect(screen.getAllByRole('link')[0]).toHaveTextContent('One'));
    it('with the correct text for the 2nd link', async () => expect(screen.getAllByRole('link')[1]).toHaveTextContent('Two'));
    it('with the correct text for the 3rd link', async () => expect(screen.getAllByRole('link')[2]).toHaveTextContent('Three'));
  });
});
