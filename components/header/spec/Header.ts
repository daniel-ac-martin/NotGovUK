import { createElement as h } from 'react';
import { mount } from '@not-govuk/component-test-helpers';
import Header from '../src/Header';

describe('Header', () => {
  describe('when given valid props', () => {
    const component = mount(h(Header, {}));
    const text = component.text();

    it('renders', () => undefined);
    it('is NOT GOV.UK branded', () => expect(text).not.toContain('GOV.UK'));
    it('does NOT contain the sign-out link', () => expect(text).not.toContain('Sign out'));
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
    const component = mount(h(Header, props, 'Child'));
    const text = component.text();

    it('renders', () => undefined);
    it('is GOV.UK branded', () => expect(text).toContain('GOV.UK'));
    it('contains the service name', () => expect(text).toContain('Service name'));
    it('contains the navigation links', () => expect(text).toContain('Navigation item 2'));
    it('contains the sign-out link', () => expect(text).toContain('Log out'));
  });
});
