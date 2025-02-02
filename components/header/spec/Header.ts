import { createElement as h } from 'react';
import { render, screen } from '@not-govuk/component-test-helpers';
import Header from '../src/Header';

describe('Header', () => {
  describe('when given valid props', () => {
    beforeEach(async () => {
      render(h(Header, {}));
    });

    it('renders an element', async () => expect(screen.getByRole('banner')).toBeInTheDocument());
    it('is NOT GOV.UK branded', async () => expect(screen.getByRole('banner')).not.toHaveTextContent('GOV.UK'));
    it('does NOT contain the sign-out link', async () => expect(screen.getByRole('banner')).not.toHaveTextContent('Sign out'));
  });

  describe('when given minimal govUK props', () => {
    beforeEach(async () => {
      render(h(Header, { govUK: true }));
    });

    it('renders an element', async () => expect(screen.getByRole('banner')).toBeInTheDocument());
    it('is GOV.UK branded', async () => expect(screen.getByRole('banner')).toHaveTextContent('GOV.UK'));
    it('contains the logo', async () => expect(screen.getByRole('img')).toHaveTextContent('GOV.UK'));
    it('does NOT contain the sign-out link', async () => expect(screen.getByRole('banner')).not.toHaveTextContent('Sign out'));
  });

  describe('when given all valid props', () => {
    const props = {
      govUK: true,
      logo: null,
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
    it('does NOT contain a logo', async () => expect(screen.queryByRole('img')).not.toBeInTheDocument());
    it('contains the service name', async () => expect(screen.getByRole('banner')).toHaveTextContent('Service name'));
    it('contains the navigation links', async () => expect(screen.getByRole('banner')).toHaveTextContent('Navigation item 2'));
    it('contains the sign-out link', async () => expect(screen.getByRole('banner')).toHaveTextContent('Log out'));
  });
});
