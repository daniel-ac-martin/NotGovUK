import type { Meta, StoryObj } from '@storybook/react-vite';

import { A } from '@not-govuk/link';
import { Footer } from '../src/Footer';

const meta = {
  title: 'Footer',
  parameters: {
    chromatic: {
      viewports: [1280, 360]
    },
    description:
      'A page footer providing copyright, licensing and other information about your service and department.'
  },
  component: Footer,
  args: {}
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { govUK: true }
};

export const Standard: Story = {
  args: {}
};

export const GOVUK: Story = {
  args: { govUK: true },
  name: 'GOV.UK'
};

export const RebrandedGOVUK: Story = {
  args: { govUK: true, rebrand: true },
  render: ({ ...props }) => (
    <div className="govuk-template--rebranded">
      <Footer {...props} />
    </div>
  ),
  name: 'Re-branded GOV.UK'
};

export const Navigation: Story = {
  args: { govUK: true },
  render: ({ ...props }) => (
    <Footer
      {...props}
      navigation={[
        {
          title: 'Two column list',
          width: 'two-thirds',
          columns: 2,
          items: [
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
            },
            {
              href: '#5',
              text: 'Navigation item 5'
            },
            {
              href: '#6',
              text: 'Navigation item 6'
            }
          ]
        },
        {
          title: 'Single column list',
          width: 'one-third',
          items: [
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
          ]
        }
      ]}
    />
  )
};

export const MetaLinks: Story = {
  args: { govUK: true },
  render: ({ ...props }) => (
    <Footer
      {...props}
      meta={[
        {
          href: '#1',
          text: 'Item 1'
        },
        {
          href: '#2',
          text: 'Item 2'
        },
        {
          href: '#3',
          text: 'Item 3'
        }
      ]}
    />
  ),
  name: 'Meta links'
};

export const NavAndMeta: Story = {
  args: { govUK: true },
  render: ({ ...props }) => (
    <Footer
      {...props}
      navigation={[
        {
          title: 'Services and information',
          width: 'two-thirds',
          columns: 2,
          items: [
            {
              href: '#',
              text: 'Benefits'
            },
            {
              href: '#',
              text: 'Births, deaths, marriages and care'
            },
            {
              href: '#',
              text: 'Business and self-employed'
            },
            {
              href: '#',
              text: 'Childcare and parenting'
            },
            {
              href: '#',
              text: 'Citizenship and living in the UK'
            },
            {
              href: '#',
              text: 'Crime, justice and the law'
            },
            {
              href: '#',
              text: 'Disabled people'
            },
            {
              href: '#',
              text: 'Driving and transport'
            },
            {
              href: '#',
              text: 'Education and learning'
            },
            {
              href: '#',
              text: 'Employing people'
            },
            {
              href: '#',
              text: 'Environment and countryside'
            },
            {
              href: '#',
              text: 'Housing and local services'
            },
            {
              href: '#',
              text: 'Money and tax'
            },
            {
              href: '#',
              text: 'Passports, travel and living abroad'
            },
            {
              href: '#',
              text: 'Visas and immigration'
            },
            {
              href: '#',
              text: 'Working, jobs and pensions'
            }
          ]
        },
        {
          title: 'Departments and policy',
          width: 'one-third',
          items: [
            {
              href: '#',
              text: 'How government works'
            },
            {
              href: '#',
              text: 'Departments'
            },
            {
              href: '#',
              text: 'Worldwide'
            },
            {
              href: '#',
              text: 'Policies'
            },
            {
              href: '#',
              text: 'Publications'
            },
            {
              href: '#',
              text: 'Announcements'
            }
          ]
        }
      ]}
      meta={[
        {
          href: '#',
          text: 'Help'
        },
        {
          href: '#',
          text: 'Cookies'
        },
        {
          href: '#',
          text: 'Contact'
        },
        {
          href: '#',
          text: 'Terms and conditions'
        },
        {
          href: '#',
          text: 'Rhestr o Wasanaethau Cymraeg'
        }
      ]}
    >
      <p>
        Built by the <A href="#">Government Digital Service</A>
      </p>
    </Footer>
  ),
  name: 'Nav and meta'
};
