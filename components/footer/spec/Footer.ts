import { createElement as h } from 'react';
import { mount } from '@not-govuk/component-test-helpers';
import Footer from '../src/Footer';

describe('Footer', () => {
  describe('when given valid props', () => {
    const component = mount(h(Footer, {}));

    it('renders', () => undefined);
  });
  describe('when given all valid props', () => {
    const props = {
      govUK: true,
      navigation: [
        {
          title: "Services and information",
          columns: 2,
          items: [
            {
              href: "#",
              text: "Benefits"
            },
            {
              href: "#",
              text: "Births, deaths, marriages and care"
            },
            {
              href: "#",
              text: "Business and self-employed"
            },
            {
              href: "#",
              text: "Childcare and parenting"
            },
            {
              href: "#",
              text: "Citizenship and living in the UK"
            },
            {
              href: "#",
              text: "Crime, justice and the law"
            },
            {
              href: "#",
              text: "Disabled people"
            },
            {
              href: "#",
              text: "Driving and transport"
            },
            {
              href: "#",
              text: "Education and learning"
            },
            {
              href: "#",
              text: "Employing people"
            },
            {
              href: "#",
              text: "Environment and countryside"
            },
            {
              href: "#",
              text: "Housing and local services"
            },
            {
              href: "#",
              text: "Money and tax"
            },
            {
              href: "#",
              text: "Passports, travel and living abroad"
            },
            {
              href: "#",
              text: "Visas and immigration"
            },
            {
              href: "#",
              text: "Working, jobs and pensions"
            }
          ]
        },
        {
          title: "Departments and policy",
          items: [
            {
              href: "#",
              text: "How government works"
            },
            {
              href: "#",
              text: "Departments"
            },
            {
              href: "#",
              text: "Worldwide"
            },
            {
              href: "#",
              text: "Policies"
            },
            {
              href: "#",
              text: "Publications"
            },
            {
              href: "#",
              text: "Announcements"
            }
          ]
        }
      ],
      meta: [
        {
          href: "#",
          text: "Help"
        },
        {
          href: "#",
          text: "Cookies"
        },
        {
          href: "#",
          text: "Contact"
        },
        {
          href: "#",
          text: "Terms and conditions"
        },
        {
          href: "#",
          text: "Rhestr o Wasanaethau Cymraeg"
        }
      ]
    };
    const component = mount(h(Footer, props, 'Child'));

    it('renders', () => undefined);
  });
});
