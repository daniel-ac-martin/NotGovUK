import { createElement as h } from 'react';
import { render, screen } from '@not-govuk/component-test-helpers';
import Panel from '../src/Panel';

describe('Panel', () => {
  const minimalProps = {
    title: 'My heading'
  };

  describe('when given valid props', () => {
    beforeEach(async () => {
      render(h(Panel, minimalProps, 'Child'));
    });

    it('renders an element', async () => expect(screen.getAllByRole('generic')[0]).toBeInTheDocument());
    it('renders a heading with the title', async () => expect(screen.getByRole('heading')).toHaveTextContent('My heading'));
    it('renders the children', async () => expect(screen.getAllByRole('generic')[0]).toHaveTextContent('Child'));
  });
});
