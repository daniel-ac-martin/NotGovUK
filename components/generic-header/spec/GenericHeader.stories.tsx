import type { Meta, StoryObj } from '@storybook/react-vite';

import { GenericHeader } from '../src/GenericHeader';

const meta = {
  title: 'Generic header',
  parameters: {
    chromatic: {
      viewports: [1280, 360]
    },
    description:
      'A component that shows users they are using a service that is not part of GOV.UK.'
  },
  component: GenericHeader,
  args: {}
} satisfies Meta<typeof GenericHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    organisationHref: '#',
    logo: (
      <>
        <svg width="28" height="30" viewBox="0 0 28 30" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <circle cx="13.5549" cy="4.21349" r="4.21349"/>
          <circle cx="13.5549" cy="25.7865" r="4.21349"/>
          <circle cx="22.8963" cy="9.6068" r="4.21349"/>
          <circle cx="4.2135" cy="20.3932" r="4.21349"/>
          <circle cx="22.8963" cy="20.3932" r="4.21349"/>
          <circle cx="4.21351" cy="9.60674" r="4.21349"/>
        </svg> Service name
      </>
    )
  }
};

export const Standard: Story = {
  args: {}
};

export const ServiceName: Story = {
  args: { department: 'department-for-culture-media-sport', serviceName: 'Service name', serviceHref: '#' },
  name: 'Service name'
};

export const FullWidth: Story = {
  args: { department: 'department-for-culture-media-sport', maxContentsWidth: -1 },
  name: 'Full width'
};

export const CustomLogo: Story = {
  args: {},
  render: ({ ...props }) => <GenericHeader {...props} logo={<span>Logo</span>} />,
  name: 'Custom logo'
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

export const DHSC: Story = {
  args: { department: 'department-of-health-social-care' }
};

export const DWP: Story = {
  args: { department: 'department-for-work-pensions' }
};

export const FCDO: Story = {
  args: { department: 'foreign-commonwealth-development-office' }
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
  args: { department: 'ministry-of-housing-communities-local-government' }
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
