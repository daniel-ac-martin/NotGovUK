import type { Meta, StoryObj } from '@storybook/react-vite';

import { StartButton } from '@not-govuk/button';
import { GovUKPage, NotGovUKPage, Page } from '../src';

const meta = {
  title: 'Unofficial/Page',
  parameters: {
    chromatic: {
      viewports: [1280, 360]
    },
    description:
      'A fully branded page with content sandwiched between the header and footer.',
    image:
      'https://snapshots.chromatic.com/snapshots/5f1488148c817700223adb9a-5ff08dbae29b2700217b538f/capture.png'
  },
  component: Page,
  args: {}
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: ({ ...props }) => (
    <GovUKPage
      maxContentsWidth="690"
      meta={[
        {
          href: '#',
          text: 'Cookies'
        },
        {
          href: '#',
          text: 'Privacy policy'
        },
        {
          href: '#',
          text: 'Accessibility statement'
        },
        {
          href: '#',
          text: 'Contact'
        }
      ]}
      phase="Alpha"
      serviceName="My service"
      serviceHref="#"
    >
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <h1>
            <span className="caption">Caption</span>
            My page
          </h1>
          <p>My content</p>
        </div>
        <div className="govuk-grid-column-one-third">
          <aside>
            <h2>Did you know?</h2>
            <p>NotGovUK can cater for both public and internal websites.</p>
          </aside>
        </div>
      </div>
    </GovUKPage>
  )
};

export const Standard: Story = {
  args: {},
  render: ({ ...props }) => (
    <NotGovUKPage maxContentsWidth="690">
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <h1>
            <span className="caption">Caption</span>
            My page
          </h1>
          <p>My content</p>
        </div>
        <div className="govuk-grid-column-one-third">
          <aside>
            <h2>Did you know?</h2>
            <p>NotGovUK can cater for both public and internal websites.</p>
          </aside>
        </div>
      </div>
    </NotGovUKPage>
  )
};

export const GovUK: Story = {
  args: {},
  render: ({ ...props }) => (
    <GovUKPage maxContentsWidth="690">
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <h1>
            <span className="caption">Caption</span>
            My page
          </h1>
          <p>My content</p>
        </div>
        <div className="govuk-grid-column-one-third">
          <aside>
            <h2>Did you know?</h2>
            <p>NotGovUK can cater for both public and internal websites.</p>
          </aside>
        </div>
      </div>
    </GovUKPage>
  )
};

export const GovUKRebrand: Story = {
  args: {},
  render: ({ ...props }) => (
    <GovUKPage maxContentsWidth="690" rebrand>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <h1>
            <span className="caption">Caption</span>
            My page
          </h1>
          <p>My content</p>
        </div>
        <div className="govuk-grid-column-one-third">
          <aside>
            <h2>Did you know?</h2>
            <p>NotGovUK can cater for both public and internal websites.</p>
          </aside>
        </div>
      </div>
    </GovUKPage>
  ),
  name: 'GovUK rebrand'
};

export const FullWidth: Story = {
  args: {},
  render: ({ ...props }) => (
    <NotGovUKPage maxContentsWidth={-1}>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <h1>
            <span className="caption">Caption</span>
            My page
          </h1>
          <p>My content</p>
        </div>
        <div className="govuk-grid-column-one-third">
          <aside>
            <h2>Did you know?</h2>
            <p>NotGovUK can cater for both public and internal websites.</p>
          </aside>
        </div>
      </div>
    </NotGovUKPage>
  ),
  name: 'Full width'
};

export const DarkMode: Story = {
  args: {},
  render: ({ ...props }) => (
    <NotGovUKPage
      breadcrumbs={[
        {
          href: '',
          text: 'Home'
        },
        {
          href: '',
          text: 'Passports, travel and living abroad'
        },
        {
          href: '',
          text: 'Travel abroad'
        }
      ]}
      classModifiers="dark"
      department="home-office"
      maxContentsWidth="690"
      meta={[
        {
          href: '#',
          text: 'Help'
        },
        {
          href: '#',
          text: 'Accessibility statement'
        },
        {
          href: '#',
          text: 'Contact'
        }
      ]}
      organisationHref="#"
      organisationText="HMPO"
      phase="Alpha"
      serviceName="My service"
      serviceHref="#"
    >
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <h1>
            <span className="caption">Caption</span>
            My page
          </h1>
          <p>My content</p>
          <StartButton href="#" />
        </div>
        <div className="govuk-grid-column-one-third">
          <aside>
            <h2>Did you know?</h2>
            <p>
              <a href="#">NotGovUK</a> can cater for both public and internal
              websites.
            </p>
          </aside>
        </div>
      </div>
    </NotGovUKPage>
  ),
  name: 'Dark mode'
};

export const DarkModeRebrand: Story = {
  args: {},
  render: ({ ...props }) => (
    <NotGovUKPage
      breadcrumbs={[
        {
          href: '',
          text: 'Home'
        },
        {
          href: '',
          text: 'Passports, travel and living abroad'
        },
        {
          href: '',
          text: 'Travel abroad'
        }
      ]}
      classModifiers="dark"
      department="home-office"
      maxContentsWidth="690"
      meta={[
        {
          href: '#',
          text: 'Help'
        },
        {
          href: '#',
          text: 'Accessibility statement'
        },
        {
          href: '#',
          text: 'Contact'
        }
      ]}
      organisationHref="#"
      organisationText="HMPO"
      phase="Alpha"
      rebrand
      serviceName="My service"
      serviceHref="#"
    >
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <h1>
            <span className="caption">Caption</span>
            My page
          </h1>
          <p>My content</p>
          <StartButton href="#" />
        </div>
        <div className="govuk-grid-column-one-third">
          <aside>
            <h2>Did you know?</h2>
            <p>
              <a href="#">NotGovUK</a> can cater for both public and internal
              websites.
            </p>
          </aside>
        </div>
      </div>
    </NotGovUKPage>
  ),
  name: 'Dark mode rebrand'
};

export const CustomLogo: Story = {
  args: {},
  render: ({ ...props }) => (
    <NotGovUKPage logo={<span>Logo</span>}>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <h1>
            <span className="caption">Caption</span>
            My page
          </h1>
          <p>My content</p>
        </div>
        <div className="govuk-grid-column-one-third">
          <aside>
            <h2>Did you know?</h2>
            <p>NotGovUK can cater for both public and internal websites.</p>
          </aside>
        </div>
      </div>
    </NotGovUKPage>
  ),
  name: 'Custom logo'
};

export const NoLogo: Story = {
  args: {},
  render: ({ ...props }) => (
    <NotGovUKPage logo={null}>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <h1>
            <span className="caption">Caption</span>
            My page
          </h1>
          <p>My content</p>
        </div>
        <div className="govuk-grid-column-one-third">
          <aside>
            <h2>Did you know?</h2>
            <p>NotGovUK can cater for both public and internal websites.</p>
          </aside>
        </div>
      </div>
    </NotGovUKPage>
  ),
  name: 'No logo'
};

export const DBT: Story = {
  args: {},
  render: ({ ...props }) => (
    <NotGovUKPage
      department="department-for-business-trade"
      maxContentsWidth="690"
      meta={[
        {
          href: '#',
          text: 'Help'
        },
        {
          href: '#',
          text: 'Accessibility statement'
        },
        {
          href: '#',
          text: 'Contact'
        }
      ]}
      organisationHref="#"
      phase="Alpha"
      serviceName="My service"
      serviceHref="#"
    >
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <h1>
            <span className="caption">Caption</span>
            My page
          </h1>
          <p>My content</p>
        </div>
        <div className="govuk-grid-column-one-third">
          <aside>
            <h2>Did you know?</h2>
            <p>NotGovUK can cater for both public and internal websites.</p>
          </aside>
        </div>
      </div>
    </NotGovUKPage>
  )
};

export const DBTRebrand: Story = {
  args: {},
  render: ({ ...props }) => (
    <NotGovUKPage
      department="department-for-business-trade"
      maxContentsWidth="690"
      meta={[
        {
          href: '#',
          text: 'Help'
        },
        {
          href: '#',
          text: 'Accessibility statement'
        },
        {
          href: '#',
          text: 'Contact'
        }
      ]}
      organisationHref="#"
      phase="Alpha"
      rebrand
      serviceName="My service"
      serviceHref="#"
    >
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <h1>
            <span className="caption">Caption</span>
            My page
          </h1>
          <p>My content</p>
        </div>
        <div className="govuk-grid-column-one-third">
          <aside>
            <h2>Did you know?</h2>
            <p>NotGovUK can cater for both public and internal websites.</p>
          </aside>
        </div>
      </div>
    </NotGovUKPage>
  ),
  name: 'DBT rebrand'
};

export const DCMS: Story = {
  args: {},
  render: ({ ...props }) => (
    <NotGovUKPage
      department="department-for-culture-media-sport"
      maxContentsWidth="690"
      meta={[
        {
          href: '#',
          text: 'Help'
        },
        {
          href: '#',
          text: 'Accessibility statement'
        },
        {
          href: '#',
          text: 'Contact'
        }
      ]}
      organisationHref="#"
      phase="Alpha"
      serviceName="My service"
      serviceHref="#"
    >
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <h1>
            <span className="caption">Caption</span>
            My page
          </h1>
          <p>My content</p>
        </div>
        <div className="govuk-grid-column-one-third">
          <aside>
            <h2>Did you know?</h2>
            <p>NotGovUK can cater for both public and internal websites.</p>
          </aside>
        </div>
      </div>
    </NotGovUKPage>
  )
};

export const DEFRA: Story = {
  args: {},
  render: ({ ...props }) => (
    <NotGovUKPage
      department="department-for-environment-food-rural-affairs"
      maxContentsWidth="690"
      meta={[
        {
          href: '#',
          text: 'Help'
        },
        {
          href: '#',
          text: 'Accessibility statement'
        },
        {
          href: '#',
          text: 'Contact'
        }
      ]}
      organisationHref="#"
      phase="Alpha"
      serviceName="My service"
      serviceHref="#"
    >
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <h1>
            <span className="caption">Caption</span>
            My page
          </h1>
          <p>My content</p>
        </div>
        <div className="govuk-grid-column-one-third">
          <aside>
            <h2>Did you know?</h2>
            <p>NotGovUK can cater for both public and internal websites.</p>
          </aside>
        </div>
      </div>
    </NotGovUKPage>
  )
};

export const DWP: Story = {
  args: {},
  render: ({ ...props }) => (
    <NotGovUKPage
      department="department-for-work-pensions"
      maxContentsWidth="690"
      meta={[
        {
          href: '#',
          text: 'Help'
        },
        {
          href: '#',
          text: 'Accessibility statement'
        },
        {
          href: '#',
          text: 'Contact'
        }
      ]}
      organisationHref="#"
      phase="Alpha"
      serviceName="My service"
      serviceHref="#"
    >
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <h1>
            <span className="caption">Caption</span>
            My page
          </h1>
          <p>My content</p>
        </div>
        <div className="govuk-grid-column-one-third">
          <aside>
            <h2>Did you know?</h2>
            <p>NotGovUK can cater for both public and internal websites.</p>
          </aside>
        </div>
      </div>
    </NotGovUKPage>
  )
};

export const FCO: Story = {
  args: {},
  render: ({ ...props }) => (
    <NotGovUKPage
      department="foreign-commonwealth-office"
      maxContentsWidth="690"
      meta={[
        {
          href: '#',
          text: 'Help'
        },
        {
          href: '#',
          text: 'Accessibility statement'
        },
        {
          href: '#',
          text: 'Contact'
        }
      ]}
      organisationHref="#"
      organisationText="Foreign Office"
      phase="Alpha"
      serviceName="My service"
      serviceHref="#"
    >
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <h1>
            <span className="caption">Caption</span>
            My page
          </h1>
          <p>My content</p>
        </div>
        <div className="govuk-grid-column-one-third">
          <aside>
            <h2>Did you know?</h2>
            <p>NotGovUK can cater for both public and internal websites.</p>
          </aside>
        </div>
      </div>
    </NotGovUKPage>
  )
};

export const HomeOffice: Story = {
  args: {},
  render: ({ ...props }) => (
    <NotGovUKPage
      department="home-office"
      maxContentsWidth="690"
      meta={[
        {
          href: '#',
          text: 'Help'
        },
        {
          href: '#',
          text: 'Accessibility statement'
        },
        {
          href: '#',
          text: 'Contact'
        }
      ]}
      organisationHref="#"
      phase="Alpha"
      serviceName="My service"
      serviceHref="#"
    >
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <h1>
            <span className="caption">Caption</span>
            My page
          </h1>
          <p>My content</p>
        </div>
        <div className="govuk-grid-column-one-third">
          <aside>
            <h2>Did you know?</h2>
            <p>NotGovUK can cater for both public and internal websites.</p>
          </aside>
        </div>
      </div>
    </NotGovUKPage>
  ),
  name: 'Home Office'
};

export const HMRC: Story = {
  args: {},
  render: ({ ...props }) => (
    <NotGovUKPage
      department="hm-revenue-customs"
      maxContentsWidth="690"
      meta={[
        {
          href: '#',
          text: 'Help'
        },
        {
          href: '#',
          text: 'Accessibility statement'
        },
        {
          href: '#',
          text: 'Contact'
        }
      ]}
      organisationHref="#"
      phase="Alpha"
      serviceName="My service"
      serviceHref="#"
    >
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <h1>
            <span className="caption">Caption</span>
            My page
          </h1>
          <p>My content</p>
        </div>
        <div className="govuk-grid-column-one-third">
          <aside>
            <h2>Did you know?</h2>
            <p>NotGovUK can cater for both public and internal websites.</p>
          </aside>
        </div>
      </div>
    </NotGovUKPage>
  )
};

export const HMTreasury: Story = {
  args: {},
  render: ({ ...props }) => (
    <NotGovUKPage
      department="hm-treasury"
      maxContentsWidth="690"
      meta={[
        {
          href: '#',
          text: 'Help'
        },
        {
          href: '#',
          text: 'Accessibility statement'
        },
        {
          href: '#',
          text: 'Contact'
        }
      ]}
      organisationHref="#"
      phase="Alpha"
      serviceName="My service"
      serviceHref="#"
    >
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <h1>
            <span className="caption">Caption</span>
            My page
          </h1>
          <p>My content</p>
        </div>
        <div className="govuk-grid-column-one-third">
          <aside>
            <h2>Did you know?</h2>
            <p>NotGovUK can cater for both public and internal websites.</p>
          </aside>
        </div>
      </div>
    </NotGovUKPage>
  ),
  name: 'HM treasury'
};

export const MHCLG: Story = {
  args: {},
  render: ({ ...props }) => (
    <NotGovUKPage
      department="ministry-of-housing-communities-local-government"
      maxContentsWidth="690"
      meta={[
        {
          href: '#',
          text: 'Help'
        },
        {
          href: '#',
          text: 'Accessibility statement'
        },
        {
          href: '#',
          text: 'Contact'
        }
      ]}
      organisationHref="#"
      phase="Alpha"
      serviceName="My service"
      serviceHref="#"
    >
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <h1>
            <span className="caption">Caption</span>
            My page
          </h1>
          <p>My content</p>
        </div>
        <div className="govuk-grid-column-one-third">
          <aside>
            <h2>Did you know?</h2>
            <p>NotGovUK can cater for both public and internal websites.</p>
          </aside>
        </div>
      </div>
    </NotGovUKPage>
  )
};

export const MoJ: Story = {
  args: {},
  render: ({ ...props }) => (
    <NotGovUKPage
      department="ministry-of-justice"
      maxContentsWidth="690"
      meta={[
        {
          href: '#',
          text: 'Help'
        },
        {
          href: '#',
          text: 'Accessibility statement'
        },
        {
          href: '#',
          text: 'Contact'
        }
      ]}
      organisationHref="#"
      phase="Alpha"
      serviceName="My service"
      serviceHref="#"
    >
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <h1>
            <span className="caption">Caption</span>
            My page
          </h1>
          <p>My content</p>
        </div>
        <div className="govuk-grid-column-one-third">
          <aside>
            <h2>Did you know?</h2>
            <p>NotGovUK can cater for both public and internal websites.</p>
          </aside>
        </div>
      </div>
    </NotGovUKPage>
  )
};

export const OfficeOfTheLeaderOfTheHouseOfLords: Story = {
  args: {},
  render: ({ ...props }) => (
    <NotGovUKPage
      department="office-of-the-leader-of-the-house-of-lords"
      maxContentsWidth="690"
      meta={[
        {
          href: '#',
          text: 'Help'
        },
        {
          href: '#',
          text: 'Accessibility statement'
        },
        {
          href: '#',
          text: 'Contact'
        }
      ]}
      organisationHref="#"
      organisationText="House of Lords"
      phase="Alpha"
      serviceName="My service"
      serviceHref="#"
    >
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <h1>
            <span className="caption">Caption</span>
            My page
          </h1>
          <p>My content</p>
        </div>
        <div className="govuk-grid-column-one-third">
          <aside>
            <h2>Did you know?</h2>
            <p>NotGovUK can cater for both public and internal websites.</p>
          </aside>
        </div>
      </div>
    </NotGovUKPage>
  ),
  name: 'Office of the leader of the House of lords'
};

export const ScotlandOffice: Story = {
  args: {},
  render: ({ ...props }) => (
    <NotGovUKPage
      department="scotland-office"
      maxContentsWidth="690"
      meta={[
        {
          href: '#',
          text: 'Help'
        },
        {
          href: '#',
          text: 'Accessibility statement'
        },
        {
          href: '#',
          text: 'Contact'
        }
      ]}
      organisationHref="#"
      phase="Alpha"
      serviceName="My service"
      serviceHref="#"
    >
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <h1>
            <span className="caption">Caption</span>
            My page
          </h1>
          <p>My content</p>
        </div>
        <div className="govuk-grid-column-one-third">
          <aside>
            <h2>Did you know?</h2>
            <p>NotGovUK can cater for both public and internal websites.</p>
          </aside>
        </div>
      </div>
    </NotGovUKPage>
  ),
  name: 'Scotland office'
};

export const WalesOffice: Story = {
  args: {},
  render: ({ ...props }) => (
    <NotGovUKPage
      department="wales-office"
      maxContentsWidth="690"
      meta={[
        {
          href: '#',
          text: 'Help'
        },
        {
          href: '#',
          text: 'Accessibility statement'
        },
        {
          href: '#',
          text: 'Contact'
        }
      ]}
      organisationHref="#"
      phase="Alpha"
      serviceName="My service"
      serviceHref="#"
    >
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <h1>
            <span className="caption">Caption</span>
            My page
          </h1>
          <p>My content</p>
        </div>
        <div className="govuk-grid-column-one-third">
          <aside>
            <h2>Did you know?</h2>
            <p>NotGovUK can cater for both public and internal websites.</p>
          </aside>
        </div>
      </div>
    </NotGovUKPage>
  ),
  name: 'Wales office'
};

export const Custom: Story = {
  args: {},
  render: ({ ...props }) => (
    <NotGovUKPage
      breadcrumbs={[
        {
          href: '',
          text: 'Home'
        },
        {
          href: '',
          text: 'Passports, travel and living abroad'
        },
        {
          href: '',
          text: 'Travel abroad'
        }
      ]}
      department="home-office"
      feedbackHref="#feedback"
      footerContent={
        <p>
          Built by the{' '}
          <a href="https://www.gov.uk">Government Digital Service</a>.
        </p>
      }
      footerNavigation={[
        {
          title: 'Services and information',
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
      navigation={[
        {
          href: '#1',
          text: 'One'
        },
        {
          href: '?2',
          text: 'Two'
        },
        {
          href: '?3',
          text: 'Three'
        },
        {
          href: '?4',
          text: 'Four'
        }
      ]}
      organisationHref="#"
      phase="Alpha"
      serviceName="Service name"
      serviceHref="#"
      maxContentsWidth="690"
    >
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <h1>
            <span className="caption">Caption</span>
            My page
          </h1>
          <p>My content</p>
        </div>
        <div className="govuk-grid-column-one-third">
          <aside>
            <h2>Did you know?</h2>
            <p>NotGovUK can cater for both public and internal websites.</p>
          </aside>
        </div>
      </div>
    </NotGovUKPage>
  )
};
