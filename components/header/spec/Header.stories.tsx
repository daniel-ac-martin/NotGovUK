import type { Meta, StoryObj } from '@storybook/react-vite';

import { Header } from '../src/Header';

const meta = {
  title: 'Header',
  parameters: {
    chromatic: {
      viewports: [1280, 360]
    },
    description:
      'A component that shows users whether they are on GOV.UK and which service they are using.'
  },
  component: Header,
  args: {}
} satisfies Meta<typeof Header>;

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
      <Header {...props} />
    </div>
  ),
  name: 'Re-branded GOV.UK'
};

export const ServiceName: Story = {
  args: { govUK: true, serviceName: 'Service name', serviceHref: '#' },
  name: 'Service name'
};

export const Navigation: Story = {
  args: {
    govUK: true,
    organisationHref: '#',
    serviceName: 'Service name',
    serviceHref: '#'
  },
  render: ({ ...props }) => (
    <Header
      {...props}
      navigation={[
        {
          href: '#1',
          text: 'Navigation item 1',
          active: true
        },
        {
          href: '?2',
          text: 'Navigation item 2'
        },
        {
          href: '?3',
          text: 'Navigation item 3'
        },
        {
          href: '?4',
          text: 'Navigation item 4'
        }
      ]}
    />
  )
};

export const SignOut: Story = {
  args: {
    signOutHref: '#sign-out',
    serviceName: 'My service',
    serviceHref: '#my-service'
  },
  name: 'Sign out'
};

export const FullWidth: Story = {
  args: { maxContentsWidth: -1 },
  name: 'Full width'
};

export const CustomLogo: Story = {
  args: {},
  render: ({ ...props }) => <Header {...props} logo={<span>Logo</span>} />,
  name: 'Custom logo'
};

export const NoLogo: Story = {
  args: {},
  render: ({ ...props }) => <Header {...props} logo={null} />,
  name: 'No logo'
};

export const DBT: Story = {
  args: { department: 'department-for-business-trade' }
};

export const DCMS: Story = {
  args: { department: 'department-for-culture-media-sport' }
};

export const DEFRA: Story = {
  args: { department: 'department-for-environment-food-rural-affairs' }
};

export const DWP: Story = {
  args: { department: 'department-for-work-pensions' }
};

export const FCO: Story = {
  args: { department: 'foreign-commonwealth-office' }
};

export const HomeOffice: Story = {
  args: { department: 'home-office' },
  name: 'Home Office'
};

export const HMRC: Story = {
  args: { department: 'hm-revenue-customs' }
};

export const HMTreasury: Story = {
  args: { department: 'hm-treasury' },
  name: 'HM treasury'
};

export const MHCLG: Story = {
  args: { department: 'ministry-for-housing-communities-local-government' }
};

export const MoJ: Story = {
  args: { department: 'ministry-of-justice' }
};

export const OfficeOfTheLeaderOfTheHouseOfLords: Story = {
  args: { department: 'office-of-the-leader-of-the-house-of-lords' },
  name: 'Office of the leader of the House of lords'
};

export const ScotlandOffice: Story = {
  args: { department: 'scotland-office' },
  name: 'Scotland office'
};

export const WalesOffice: Story = {
  args: { department: 'wales-office' },
  name: 'Wales office'
};
