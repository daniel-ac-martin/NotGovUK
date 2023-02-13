import { createElement as h } from 'react';
import { render, screen } from '@not-govuk/component-test-helpers';
import Breadcrumbs from '../src/Breadcrumbs';

describe('Breadcrumbs', () => {
  describe('when given valid props', () => {
    beforeEach(async () => {
      render(h(Breadcrumbs, {
        items: [
          { text: 'One', href: '/one' },
          { text: 'Two', href: '/two' },
          { text: 'Three', href: '/three' }
        ]
      }));
    });

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
