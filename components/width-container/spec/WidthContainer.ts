import { createElement as h } from 'react';
import { render, screen } from '@not-govuk/component-test-helpers';
import WidthContainer from '../src/WidthContainer';

describe('WidthContainer', () => {
  const minimalProps = {};

  describe('when given valid props', () => {
    beforeEach(async () => {
      render(h(WidthContainer, minimalProps));
    });

    it('renders an element', async () => expect(screen.getAllByRole('generic')[1]).toBeInTheDocument());
  });

  describe('when given a maximum width', () => {
    const props = {
      ...minimalProps,
      maxWidth: 1000
    };

    beforeEach(async () => {
      render(h(WidthContainer, props, 'Child'));
    });

    it('renders an element', async () => expect(screen.getAllByRole('generic')[1]).toBeInTheDocument());
    it('that the child provided', async () => expect(screen.getAllByRole('generic')[1]).toHaveTextContent('Child'));
    it('with limited width', async () => expect(screen.getAllByRole('generic')[1]).toHaveStyle({ maxWidth: '1000px' }));
  });

  describe('when given a maximum width of -1', () => {
    const props = {
      ...minimalProps,
      maxWidth: -1
    };

    beforeEach(async () => {
      render(h(WidthContainer, props, 'Child'));
    });

    it('renders an element', async () => expect(screen.getAllByRole('generic')[1]).toBeInTheDocument());
    it('that contains the child provided', async () => expect(screen.getAllByRole('generic')[1]).toHaveTextContent('Child'));
    it('with unlimited width', async () => expect(screen.getAllByRole('generic')[1]).toHaveStyle({ maxWidth: 'none' }));
  });
});
