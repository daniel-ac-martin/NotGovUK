import { createElement as h } from 'react';
import { render, screen } from '@not-govuk/component-test-helpers';
import NotGovUKPage from '../src/NotGovUKPage';

describe('NotGovUKPage', () => {
  describe('when given valid props', () => {
    beforeEach(async () => {
      render(h(NotGovUKPage, {}));
    });

    it('renders an element', async () => expect(screen.getAllByRole('generic')[0]).toBeInTheDocument());
    it('renders a skip-link', async () => expect(screen.getAllByRole('link')[0]).toHaveTextContent('Skip to main content'));
    it('renders a header', async () => expect(screen.getByRole('banner')).toBeInTheDocument());
    it('renders a footer', async () => expect(screen.getByRole('contentinfo')).toBeInTheDocument());
    it('is NOT GOV.UK branded', async () => expect(screen.queryByText('GOV.UK')).toBeNull());
  });
});
