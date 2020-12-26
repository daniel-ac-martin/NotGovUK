import { createElement as h } from 'react';
import { mount } from '@not-govuk/component-test-helpers';
import Page from '../src/Page';

describe('Page', () => {
  describe('when given valid props', () => {
    const component = mount(h(Page, {}));

    it('renders', () => undefined);
  });

  describe('when given all valid props', () => {
    const props = {
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
    const component = mount(h(Page, props, 'Child'));
    const text = component.text();

    it('renders', () => undefined);
    it('contains the breadcrumbs', () => expect(text).toContain('Breadcrumb 2'));
    it('contains the footer content', () => expect(text).toContain('Footer content'));
    it('contains the footer navigation', () => expect(text).toContain('Footer navigation'));
    it('is GOV.UK branded', () => expect(component.find('.govuk-header__logotype-crown').length).toBeTruthy());
    it('contains the meta navigation', () => expect(text).toContain('Meta item 2'));
    it('contains the meta title', () => expect(text).toContain('Meta title'));
    it('contains the organisation text', () => expect(text).toContain('Organisation text'));
    it('contains the phase', () => expect(text).toContain('gamma'));
    it('contains the phase banner content', () => expect(text).toContain('Phase banner content'));
    it('contains the service name', () => expect(text).toContain('Service name'));
    it('contains the navigation links', () => expect(text).toContain('Navigation item 2'));
    it('contains the sign-out link', () => expect(text).toContain('Log out'));
    it('includes the children provided', () => expect(text).toContain('Child'));
  });
});
