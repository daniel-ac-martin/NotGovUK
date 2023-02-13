import { createElement as h } from 'react';
import { render, screen } from '@not-govuk/component-test-helpers';
import Page from '../src/Page';

describe('Page', () => {
  const minimalProps = {};

  describe('when given valid props', () => {
    beforeEach(async () => {
      render(h(Page, minimalProps));
    });

    it('renders an element', async () => expect(screen.getAllByRole('generic')[0]).toBeInTheDocument());
    it('renders a skip-link', async () => expect(screen.getAllByRole('link')[0]).toHaveTextContent('Skip to main content'));
    it('renders a header', async () => expect(screen.getByRole('banner')).toBeInTheDocument());
    it('renders a footer', async () => expect(screen.getByRole('contentinfo')).toBeInTheDocument());
    it('is NOT GOV.UK branded', async () => expect(screen.queryByText('GOV.UK')).toBeNull());
  });

  describe.only('when given all valid props', () => {
    const props = {
      ...minimalProps,
      backHref: '/back',
      breadcrumbs: [
        {
          href: '#1',
          text: 'Breadcrumb 1'
        },
        {
          href: '#2',
          text: 'Breadcrumb 2'
        },
        {
          href: '#3',
          text: 'Breadcrumb 3'
        }
      ],
      department: 'home-office',
      feedbackHref: '/feedback',
      footerContent: 'Footer content',
      footerNavigation: [
        {
          title: "Footer navigation",
          columns: 3,
          items: []
        }
      ],
      govUK: true,
      maxContentsWidth: 300,
      meta: [
        {
          href: '#1',
          text: 'Meta item 1'
        },
        {
          href: '#2',
          text: 'Meta item 2'
        },
        {
          href: '#3',
          text: 'Meta item 3'
        }
      ],
      metaTitle: 'Meta title',
      navigation: [
        {
          href: '#1',
          text: 'Navigation item 1'
        },
        {
          href: '#2',
          text: 'Navigation item 2'
        },
        {
          href: '#3',
          text: 'Navigation item 3'
        }
      ],
      organisationHref: '#organisation',
      organisationText: 'Organisation text',
      phase: 'gamma',
      phaseBannerContent: 'Phase banner content',
      serviceName: 'Service name',
      serviceHref: '#service',
      signOutText: 'Log out',
      signOutHref: '#sign-out',
    };
    beforeEach(async () => {
      render(h(Page, props, 'Child'));
    });

    it('renders an element', async () => expect(screen.getAllByRole('generic')[0]).toBeInTheDocument());
    it('renders a skip-link', async () => expect(screen.getAllByRole('link')[0]).toHaveTextContent('Skip to main content'));
    it('renders a header', async () => expect(screen.getByRole('banner')).toBeInTheDocument());
    it('renders a footer', async () => expect(screen.getByRole('contentinfo')).toBeInTheDocument());
    it('contains the breadcrumbs', async () => expect(screen.getAllByRole('generic')[0]).toHaveTextContent('Breadcrumb 2'));
    it('contains the footer content', async () => expect(screen.getByRole('contentinfo')).toHaveTextContent('Footer content'));
    it('contains the footer navigation', async () => expect(screen.getByRole('contentinfo')).toHaveTextContent('Footer navigation'));
    it('contains the meta navigation', async () => expect(screen.getByRole('contentinfo')).toHaveTextContent('Meta item 2'));
    it('contains the meta title', async () => expect(screen.getByRole('contentinfo')).toHaveTextContent('Meta title'));
    it('contains the organisation text', async () => expect(screen.getByRole('banner')).toHaveTextContent('Organisation text'));
    it('contains the phase', async () => expect(screen.getAllByRole('generic')[0]).toHaveTextContent('gamma'));
    it('contains the phase banner content', async () => expect(screen.getAllByRole('generic')[0]).toHaveTextContent('Phase banner content'));
    it('contains the service name', async () => expect(screen.getByRole('banner')).toHaveTextContent('Service name'));
    it('contains the navigation links', async () => expect(screen.getByRole('banner')).toHaveTextContent('Navigation item 2'));
    it('contains the sign-out link', async () => expect(screen.getByRole('banner')).toHaveTextContent('Log out'));
    it('includes the children provided', async () => expect(screen.getAllByRole('generic')[0]).toHaveTextContent('Child'));
  });
});
