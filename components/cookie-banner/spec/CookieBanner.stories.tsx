import type { Meta, StoryObj } from '@storybook/react-vite';

import { Fragment } from 'react';
import { Button } from '@not-govuk/button';
import { A } from '@not-govuk/link';
import { CookieBanner } from '../src/CookieBanner';

const meta = {
  title: 'Cookie banner',
  parameters: {
    chromatic: {
      viewports: [640, 480]
    },
    description:
      'A component to allow users to accept or reject cookies which are not essential to making your service work.'
  },
  component: CookieBanner,
  args: { 'aria-label': 'Cookies on [name of service]' }
} satisfies Meta<typeof CookieBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: ({ ...props }) => (
    <CookieBanner
      {...props}
      messages={[
        {
          heading: 'Cookies on [name of service]',
          content: (
            <Fragment>
              <p className="govuk-body">
                We use some essential cookies to make this service work.
              </p>
              <p className="govuk-body">
                We’d also like to use analytics cookies so we can understand how
                you use the service and make improvements.
              </p>
            </Fragment>
          ),
          actions: (
            <Fragment>
              <Button value="accept" name="cookies">
                Accept analytics cookies
              </Button>
              <Button value="reject" name="cookies">
                Reject analytics cookies
              </Button>
              <A href="#">View cookies</A>
            </Fragment>
          )
        }
      ]}
    />
  )
};

export const Rebrand: Story = {
  args: {},
  render: ({ ...props }) => (
    <div className="govuk-template--rebranded">
      <CookieBanner
        {...props}
        messages={[
          {
            heading: 'Cookies on [name of service]',
            content: (
              <Fragment>
                <p className="govuk-body">
                  We use some essential cookies to make this service work.
                </p>
                <p className="govuk-body">
                  We’d also like to use analytics cookies so we can understand
                  how you use the service and make improvements.
                </p>
              </Fragment>
            ),
            actions: (
              <Fragment>
                <Button value="accept" name="cookies">
                  Accept analytics cookies
                </Button>
                <Button value="reject" name="cookies">
                  Reject analytics cookies
                </Button>
                <A href="#">View cookies</A>
              </Fragment>
            )
          }
        ]}
      />
    </div>
  )
};

export const Form: Story = {
  args: {},
  render: ({ ...props }) => (
    <form method="POST">
      <CookieBanner
        {...props}
        messages={[
          {
            heading: 'Cookies on [name of service]',
            content: (
              <Fragment>
                <p className="govuk-body">
                  We use some essential cookies to make this service work.
                </p>
                <p className="govuk-body">
                  We’d also like to use analytics cookies so we can understand
                  how you use the service and make improvements.
                </p>
              </Fragment>
            ),
            actions: (
              <Fragment>
                <Button value="accept" type="submit" name="cookies">
                  Accept analytics cookies
                </Button>
                <Button value="reject" type="submit" name="cookies">
                  Reject analytics cookies
                </Button>
                <A href="#">View cookies</A>
              </Fragment>
            )
          }
        ]}
      />
    </form>
  )
};

export const Confirmation: Story = {
  args: {},
  render: ({ ...props }) => (
    <form method="POST">
      <CookieBanner
        {...props}
        messages={[
          {
            heading: 'Cookies on [name of service]',
            content: (
              <p className="govuk-body">
                You’ve accepted additional cookies. You can{' '}
                <a className="govuk-link" href="#">
                  change your cookie settings
                </a>{' '}
                at any time.
              </p>
            ),
            actions: <Button href="#">Hide this message</Button>
          }
        ]}
      />
    </form>
  )
};

export const ProgressiveEnhancement: Story = {
  args: {},
  render: ({ ...props }) => (
    <form method="POST">
      <CookieBanner
        {...props}
        messages={[
          {
            heading: 'Cookies on [name of service]',
            content: (
              <Fragment>
                <p className="govuk-body">
                  We use some essential cookies to make this service work.
                </p>
                <p className="govuk-body">
                  We’d also like to use analytics cookies so we can understand
                  how you use the service and make improvements.
                </p>
              </Fragment>
            ),
            actions: (
              <Fragment>
                <Button value="accept" type="submit" name="cookies">
                  Accept analytics cookies
                </Button>
                <Button value="reject" type="submit" name="cookies">
                  Reject analytics cookies
                </Button>
                <A href="#">View cookies</A>
              </Fragment>
            )
          },
          {
            content: (
              <p className="govuk-body">
                You’ve accepted additional cookies. You can{' '}
                <a className="govuk-link" href="#">
                  change your cookie settings
                </a>{' '}
                at any time.
              </p>
            ),
            actions: <Button href="#">Hide this message</Button>,
            hidden: true
          },
          {
            content: (
              <p className="govuk-body">
                You’ve rejected additional cookies. You can{' '}
                <a className="govuk-link" href="#">
                  change your cookie settings
                </a>{' '}
                at any time.
              </p>
            ),
            actions: <Button href="#">Hide this message</Button>,
            hidden: true
          }
        ]}
      />
    </form>
  ),
  name: 'Progressive enhancement'
};

export const ProgressiveEnhancementConfirmed: Story = {
  args: {},
  render: ({ ...props }) => (
    <form method="POST">
      <CookieBanner
        {...props}
        messages={[
          {
            heading: 'Cookies on [name of service]',
            content: (
              <Fragment>
                <p className="govuk-body">
                  We use some essential cookies to make this service work.
                </p>
                <p className="govuk-body">
                  We’d also like to use analytics cookies so we can understand
                  how you use the service and make improvements.
                </p>
              </Fragment>
            ),
            actions: (
              <Fragment>
                <Button value="accept" type="submit" name="cookies">
                  Accept analytics cookies
                </Button>
                <Button value="reject" type="submit" name="cookies">
                  Reject analytics cookies
                </Button>
                <A href="#">View cookies</A>
              </Fragment>
            ),
            hidden: true
          },
          {
            content: (
              <p className="govuk-body">
                You’ve accepted additional cookies. You can{' '}
                <a className="govuk-link" href="#">
                  change your cookie settings
                </a>{' '}
                at any time.
              </p>
            ),
            actions: <Button href="#">Hide this message</Button>
          },
          {
            content: (
              <p className="govuk-body">
                You’ve rejected additional cookies. You can{' '}
                <a className="govuk-link" href="#">
                  change your cookie settings
                </a>{' '}
                at any time.
              </p>
            ),
            actions: <Button href="#">Hide this message</Button>,
            hidden: true
          }
        ]}
      />
    </form>
  ),
  name: 'Progressive enhancement confirmed'
};

export const JSOnly: Story = {
  args: {},
  render: ({ ...props }) => (
    <CookieBanner
      {...props}
      messages={[
        {
          heading: 'Cookies on [name of service]',
          content: (
            <Fragment>
              <p className="govuk-body">
                We use some essential cookies to make this service work.
              </p>
              <p className="govuk-body">
                We’d also like to use analytics cookies so we can understand how
                you use the service and make improvements.
              </p>
            </Fragment>
          ),
          actions: (
            <Fragment>
              <Button name="cookies">Accept analytics cookies</Button>
              <Button name="cookies">Reject analytics cookies</Button>
              <A href="#">View cookies</A>
            </Fragment>
          )
        },
        {
          content: (
            <p className="govuk-body">
              You’ve accepted additional cookies. You can{' '}
              <a className="govuk-link" href="#">
                change your cookie settings
              </a>{' '}
              at any time.
            </p>
          ),
          actions: <Button href="#">Hide this message</Button>,
          hidden: true,
          role: 'alert'
        },
        {
          content: (
            <p className="govuk-body">
              You’ve rejected additional cookies. You can{' '}
              <a className="govuk-link" href="#">
                change your cookie settings
              </a>{' '}
              at any time.
            </p>
          ),
          actions: <Button href="#">Hide this message</Button>,
          hidden: true,
          role: 'alert'
        }
      ]}
    />
  ),
  name: 'JS only'
};

export const JSOnlyAccepted: Story = {
  args: {},
  render: ({ ...props }) => (
    <CookieBanner
      {...props}
      messages={[
        {
          heading: 'Cookies on [name of service]',
          content: (
            <Fragment>
              <p className="govuk-body">
                We use some essential cookies to make this service work.
              </p>
              <p className="govuk-body">
                We’d also like to use analytics cookies so we can understand how
                you use the service and make improvements.
              </p>
            </Fragment>
          ),
          actions: (
            <Fragment>
              <Button name="cookies">Accept analytics cookies</Button>
              <Button name="cookies">Reject analytics cookies</Button>
              <A href="#">View cookies</A>
            </Fragment>
          ),
          hidden: true
        },
        {
          content: (
            <p className="govuk-body">
              You’ve accepted additional cookies. You can{' '}
              <a className="govuk-link" href="#">
                change your cookie settings
              </a>{' '}
              at any time.
            </p>
          ),
          actions: <Button href="#">Hide this message</Button>,
          role: 'alert'
        },
        {
          content: (
            <p className="govuk-body">
              You’ve rejected additional cookies. You can{' '}
              <a className="govuk-link" href="#">
                change your cookie settings
              </a>{' '}
              at any time.
            </p>
          ),
          actions: <Button href="#">Hide this message</Button>,
          hidden: true,
          role: 'alert'
        }
      ]}
    />
  ),
  name: 'JS only accepted'
};

export const JSOnlyRejected: Story = {
  args: {},
  render: ({ ...props }) => (
    <CookieBanner
      {...props}
      messages={[
        {
          heading: 'Cookies on [name of service]',
          content: (
            <Fragment>
              <p className="govuk-body">
                We use some essential cookies to make this service work.
              </p>
              <p className="govuk-body">
                We’d also like to use analytics cookies so we can understand how
                you use the service and make improvements.
              </p>
            </Fragment>
          ),
          actions: (
            <Fragment>
              <Button name="cookies">Accept analytics cookies</Button>
              <Button name="cookies">Reject analytics cookies</Button>
              <A href="#">View cookies</A>
            </Fragment>
          ),
          hidden: true
        },
        {
          content: (
            <p className="govuk-body">
              You’ve accepted additional cookies. You can{' '}
              <a className="govuk-link" href="#">
                change your cookie settings
              </a>{' '}
              at any time.
            </p>
          ),
          actions: <Button href="#">Hide this message</Button>,
          hidden: true,
          role: 'alert'
        },
        {
          content: (
            <p className="govuk-body">
              You’ve rejected additional cookies. You can{' '}
              <a className="govuk-link" href="#">
                change your cookie settings
              </a>{' '}
              at any time.
            </p>
          ),
          actions: <Button href="#">Hide this message</Button>,
          role: 'alert'
        }
      ]}
    />
  ),
  name: 'JS only rejected'
};

export const EssentialAndAnalytics: Story = {
  args: {},
  render: ({ ...props }) => (
    <CookieBanner
      {...props}
      messages={[
        {
          heading: 'Cookies on [name of service]',
          content: (
            <Fragment>
              <p className="govuk-body">
                We use some essential cookies to make this service work.
              </p>
              <p className="govuk-body">
                We’d also like to use analytics cookies so we can understand how
                you use the service and make improvements.
              </p>
            </Fragment>
          ),
          actions: (
            <Fragment>
              <Button value="accept" name="cookies">
                Accept analytics cookies
              </Button>
              <Button value="reject" name="cookies">
                Reject analytics cookies
              </Button>
              <A href="#">View cookies</A>
            </Fragment>
          )
        }
      ]}
    />
  ),
  name: 'Essential and analytics'
};

export const EssentialAndOthers: Story = {
  args: {},
  render: ({ ...props }) => (
    <CookieBanner
      {...props}
      messages={[
        {
          heading: 'Cookies on [name of service]',
          content: (
            <Fragment>
              <p className="govuk-body">
                We use some essential cookies to make this service work.
              </p>
              <p className="govuk-body">
                We’d like to set additional cookies so we can remember your
                settings, understand how people use the service and make
                improvements.
              </p>
            </Fragment>
          ),
          actions: (
            <Fragment>
              <Button value="accept" name="cookies">
                Accept additional cookies
              </Button>
              <Button value="reject" name="cookies">
                Reject additional cookies
              </Button>
              <A href="#">View cookies</A>
            </Fragment>
          )
        }
      ]}
    />
  ),
  name: 'Essential and others'
};
