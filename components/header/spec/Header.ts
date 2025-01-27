import { createElement as h } from 'react';
import { render, screen } from '@not-govuk/component-test-helpers';
import Header from '../src/Header';

jest.mock('../src/CrownLogo', () => ({
  CrownLogo: () =>  h('svg', {
    'data-testid': 'crownLogo',
    children: h('title', {
      children: 'GOV.UK'
    })
  })
}))

jest.mock('../src/CoatLogo', () => ({
  CoatLogo: () => h('svg', {
    'data-testid': 'coatLogo'
  })
}))

describe('Header', () => {
  describe('when given valid props', () => {
    beforeEach(async () => {
      render(h(Header, {}));
    });

    afterEach(() => {
      jest.clearAllMocks()
    })

    it('renders an element', async () => expect(screen.getByRole('banner')).toBeInTheDocument());
    it('is NOT GOV.UK branded', async () => expect(screen.getByRole('banner')).not.toHaveTextContent('GOV.UK'));
    it('does NOT contain the sign-out link', async () => expect(screen.getByRole('banner')).not.toHaveTextContent('Sign out'));
  });

  describe('when given all valid props', () => {
    const props = {
      govUK: true,
      maxContentsWidth: 300,
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
        },
        {
          href: '#4',
          text: 'Navigation item 4'
        }
      ],
      organisationHref: '#organisation',
      serviceName: 'Service name',
      serviceHref: '#service',
      signOutText: 'Log out',
      signOutHref: '#sign-out',
    };
    beforeEach(async () => {
      render(h(Header, props, 'Child'));
    });

    it('renders an element', async () => expect(screen.getByRole('banner')).toBeInTheDocument());
    it('is GOV.UK branded', async () => expect(screen.getByRole('banner')).toHaveTextContent('GOV.UK'));
    it('contains the service name', async () => expect(screen.getByRole('banner')).toHaveTextContent('Service name'));
    it('contains the navigation links', async () => expect(screen.getByRole('banner')).toHaveTextContent('Navigation item 2'));
    it('contains the sign-out link', async () => expect(screen.getByRole('banner')).toHaveTextContent('Log out'));
  });

  describe('header logo behaviour', () => {
    it('displays the crown logo', async () => {
      const props = {
        govUK: true
      };
      render(h(Header, props, 'Child'));

      expect(screen.getByTestId('crownLogo')).toBeInTheDocument()
    })

    it('displays the custom logo if the govUK prop is true and logo prop is provided', async () => {
      const props = {
        govUK: true,
        logo: h('div', { 'data-testid': 'custom-logo' })
      };
      render(h(Header, props, 'Child'));

      expect(screen.getByTestId('custom-logo')).toBeInTheDocument()
      expect(screen.queryByTestId('crownLogo')).not.toBeInTheDocument()
    })

    it('displays the coat logo', () => {
      const props = {
        govUK: false
      };

      render(h(Header, props, 'Child'));

      expect(screen.getByTestId('coatLogo')).toBeInTheDocument()
    })

    it('displays a custom ReactNode', () => {
      const props = {
        govUK: false,
        logo: h('div', { 'data-testid': 'custom-logo'})
      };

      render(h(Header, props, 'Child'));

      expect(screen.getByTestId('custom-logo')).toBeInTheDocument()
    })

    it('displays no logo', () => {
      const props = {
        govUK: false,
        logo: null
      };

      render(h(Header, props, 'Child'));

      expect(screen.queryByTestId('custom-logo')).not.toBeInTheDocument()
      expect(screen.queryByTestId('coatLogo')).not.toBeInTheDocument()
      expect(screen.queryByTestId('crownLogo')).not.toBeInTheDocument()
    })
  })
});
