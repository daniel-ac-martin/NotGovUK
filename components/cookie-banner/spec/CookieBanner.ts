import { createElement as h } from 'react';
import { render, screen } from '@not-govuk/component-test-helpers';
import CookieBanner from '../src/CookieBanner';

describe('CookieBanner', () => {
  const minimalProps = {
    messages: [{
      content: 'My message'
    }]
  };

  describe('when given minimal valid props', () => {
    beforeEach(async () => {
      render(h(CookieBanner, minimalProps));
    });

    it('renders an element', async () => expect(screen.getByRole('region')).toBeInTheDocument());
    it('contains the expected text', async () => expect(screen.getByRole('region')).toHaveTextContent('My message'));
  });

  describe('when given all valid props', () => {
    const props = {
      ...minimalProps,
      maxContentsWidth: -1,
      messages: [
        {
          heading: 'One',
          content: 'My message',
          actions: 'Action'
        },
        {
          heading: 'Two',
          content: 'My message',
          actions: 'Action'
        }
      ]
    };
    beforeEach(async () => {
      render(h(CookieBanner, props));
    });

    it('renders a region', async () => expect(screen.getByRole('region')).toBeInTheDocument());
    it('contains the expected text', async () => expect(screen.getByRole('region')).toHaveTextContent('My message'));
    it('contains the first message', async () => expect(screen.getByRole('region')).toHaveTextContent('One'));
    it('contains the second message', async () => expect(screen.getByRole('region')).toHaveTextContent('Two'));
    it('contains the action', async () => expect(screen.getByRole('region')).toHaveTextContent('Action'));
  });
});
