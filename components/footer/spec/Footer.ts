import { createElement as h } from 'react';
import { render, screen } from '@not-govuk/component-test-helpers';
import Footer from '../src/Footer';

describe('Footer', () => {
  const minimalProps = {};

  describe('when given valid props', () => {
    beforeEach(async () => {
      render(h(Footer, minimalProps));
    });

    it('renders an element', async () => expect(screen.getByRole('contentinfo')).toBeInTheDocument());
  });

  describe('when given all valid props', () => {
    const props = {
      ...minimalProps,
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
    beforeEach(async () => {
      render(h(Footer, props, 'Child'));
    });

    it('renders an element', async () => expect(screen.getByRole('contentinfo')).toBeInTheDocument());
    it('with the children provided', async () => expect(screen.getByRole('contentinfo')).toHaveTextContent('Child'));
  });
});
