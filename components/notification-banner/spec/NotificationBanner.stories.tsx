import type { Meta, StoryObj } from '@storybook/react-vite';

import { NotificationBanner } from '../src/NotificationBanner';

const meta = {
  title: 'Notification banner',
  parameters: {
    chromatic: {
      viewports: [640, 480]
    },
    description:
      'A component to tell the user about something they need to know about, but that’s not directly related to the page content.'
  },
  component: NotificationBanner,
  args: {
    children:
      'There may be a delay in processing your application because of the coronavirus outbreak.'
  }
} satisfies Meta<typeof NotificationBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { children: undefined },
  render: ({ ...props }) => (
    <NotificationBanner {...props}>
      <p className="govuk-notification-banner__heading">
        You have 7 days left to send your application. <a className="govuk-notification-banner__link" href="#">View application</a>.
      </p>
    </NotificationBanner>
  )
};

export const Standard: Story = {
  args: {}
};

export const Neutral: Story = {
  args: { children: undefined },
  render: ({ ...props }) => (
    <NotificationBanner {...props}>
      <p className="govuk-notification-banner__heading">
        You have 7 days left to send your application. <a className="govuk-notification-banner__link" href="#">View application</a>.
      </p>
    </NotificationBanner>
  )
};

export const Success: Story = {
  args: { children: undefined, type: 'success' },
  render: ({ ...props }) => (
    <NotificationBanner {...props}>
      <h3 className="govuk-notification-banner__heading">
        Training outcome recorded and trainee withdrawn
      </h3>
      <p className="govuk-body">
        Contact <a className="govuk-notification-banner__link" href="#">example@department.gov.uk</a> if you think there’s a problem.
      </p>
    </NotificationBanner>
  )
};
