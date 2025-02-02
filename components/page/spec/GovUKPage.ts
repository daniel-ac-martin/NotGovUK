import { createElement as h } from 'react';
import { render, screen } from '@not-govuk/component-test-helpers';
import GovUKPage from '../src/GovUKPage';

describe('GovUKPage', () => {
  describe('when given valid props', () => {
    beforeEach(async () => {
      render(h(GovUKPage, {}));
    });

    it('renders an element', async () => expect(screen.getAllByRole('generic')[0]).toBeInTheDocument());
    it('renders a skip-link', async () => expect(screen.getAllByRole('link')[0]).toHaveTextContent('Skip to main content'));
    it('renders a header', async () => expect(screen.getByRole('banner')).toBeInTheDocument());
    it('renders a footer', async () => expect(screen.getByRole('contentinfo')).toBeInTheDocument());
    it('is GOV.UK branded', async () => expect(screen.getByText('GOV.UK')).toBeInTheDocument());
    it('contains the logo', async () => expect(screen.getByRole('img')).toHaveTextContent('GOV.UK'));
  });
});
