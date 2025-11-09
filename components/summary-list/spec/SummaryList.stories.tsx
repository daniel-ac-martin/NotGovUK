import type { Meta, StoryObj } from '@storybook/react-vite';

import { Fragment } from 'react';
import { A } from '@not-govuk/link';
import { SummaryCard } from '@not-govuk/summary-card';
import { VisuallyHidden } from '@not-govuk/visually-hidden';
import { SummaryList } from '../src/SummaryList';

const meta = {
  title: 'Summary list',
  parameters: {
    chromatic: {
      viewports: [640, 480]
    },
    description:
      'A component to summarise information, for example, a user\u2019s responses at the end of a form.'
  },
  component: SummaryList,
  args: {}
} satisfies Meta<typeof SummaryList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: ({ ...props }) => (
    <SummaryList
      {...props}
      items={[
        {
          name: 'Name',
          actions: [
            {
              href: '#',
              children: (
                <Fragment>
                  Change<VisuallyHidden> name</VisuallyHidden>
                </Fragment>
              )
            }
          ],
          children: 'Sarah Philips'
        },
        {
          name: 'Date of birth',
          actions: [
            {
              href: '#',
              children: (
                <Fragment>
                  Change<VisuallyHidden> date of birth</VisuallyHidden>
                </Fragment>
              )
            }
          ],
          children: '5 January 1978'
        },
        {
          name: 'Address',
          actions: [
            {
              href: '#',
              children: (
                <Fragment>
                  Change<VisuallyHidden> address</VisuallyHidden>
                </Fragment>
              )
            }
          ],
          children: (
            <Fragment>
              72 Guild Street
              <br />
              London
              <br />
              SE23 6FH
            </Fragment>
          )
        },
        {
          name: 'Contact details',
          actions: [
            {
              href: '#',
              children: (
                <Fragment>
                  Add<VisuallyHidden> contact details</VisuallyHidden>
                </Fragment>
              )
            },
            {
              href: '#',
              children: (
                <Fragment>
                  Change<VisuallyHidden> contact details</VisuallyHidden>
                </Fragment>
              )
            }
          ],
          children: (
            <Fragment>
              <p className="govuk-body">07700 900457</p>
              <p className="govuk-body">sarah.phillips@example.com</p>
            </Fragment>
          )
        }
      ]}
    />
  )
};

export const Standard: Story = {
  args: {},
  render: ({ ...props }) => (
    <SummaryList
      {...props}
      items={[
        {
          name: 'Name',
          children: 'Sarah Philips'
        },
        {
          name: 'Date of birth',
          children: '5 January 1978'
        },
        {
          name: 'Address',
          children: (
            <Fragment>
              72 Guild Street
              <br />
              London
              <br />
              SE23 6FH
            </Fragment>
          )
        },
        {
          name: 'Contact details',
          children: (
            <Fragment>
              <p className="govuk-body">07700 900457</p>
              <p className="govuk-body">sarah.phillips@example.com</p>
            </Fragment>
          )
        }
      ]}
    />
  )
};

export const Actions: Story = {
  args: {},
  render: ({ ...props }) => (
    <SummaryList
      {...props}
      items={[
        {
          name: 'Name',
          actions: [
            {
              href: '#',
              children: (
                <Fragment>
                  Change<VisuallyHidden> name</VisuallyHidden>
                </Fragment>
              )
            }
          ],
          children: 'Sarah Philips'
        },
        {
          name: 'Date of birth',
          actions: [
            {
              href: '#',
              children: (
                <Fragment>
                  Change<VisuallyHidden> date of birth</VisuallyHidden>
                </Fragment>
              )
            }
          ],
          children: '5 January 1978'
        },
        {
          name: 'Address',
          actions: [
            {
              href: '#',
              children: (
                <Fragment>
                  Change<VisuallyHidden> address</VisuallyHidden>
                </Fragment>
              )
            }
          ],
          children: (
            <Fragment>
              72 Guild Street
              <br />
              London
              <br />
              SE23 6FH
            </Fragment>
          )
        },
        {
          name: 'Contact details',
          actions: [
            {
              href: '#',
              children: (
                <Fragment>
                  Add<VisuallyHidden> contact details</VisuallyHidden>
                </Fragment>
              )
            },
            {
              href: '#',
              children: (
                <Fragment>
                  Change<VisuallyHidden> contact details</VisuallyHidden>
                </Fragment>
              )
            }
          ],
          children: (
            <Fragment>
              <p className="govuk-body">07700 900457</p>
              <p className="govuk-body">sarah.phillips@example.com</p>
            </Fragment>
          )
        }
      ]}
    />
  )
};

export const MixedActions: Story = {
  args: {},
  render: ({ ...props }) => (
    <SummaryList
      {...props}
      items={[
        {
          name: 'Name',
          children: 'Sarah Philips'
        },
        {
          name: 'Date of birth',
          actions: [
            {
              href: '#',
              children: (
                <Fragment>
                  Change<VisuallyHidden> date of birth</VisuallyHidden>
                </Fragment>
              )
            }
          ],
          children: '5 January 1978'
        },
        {
          name: 'Address',
          actions: [
            {
              href: '#',
              children: (
                <Fragment>
                  Change<VisuallyHidden> address</VisuallyHidden>
                </Fragment>
              )
            }
          ],
          children: (
            <Fragment>
              72 Guild Street
              <br />
              London
              <br />
              SE23 6FH
            </Fragment>
          )
        },
        {
          name: 'Contact details',
          actions: [
            {
              href: '#',
              children: (
                <Fragment>
                  Add<VisuallyHidden> contact details</VisuallyHidden>
                </Fragment>
              )
            },
            {
              href: '#',
              children: (
                <Fragment>
                  Change<VisuallyHidden> contact details</VisuallyHidden>
                </Fragment>
              )
            }
          ],
          children: (
            <Fragment>
              <p className="govuk-body">07700 900457</p>
              <p className="govuk-body">sarah.phillips@example.com</p>
            </Fragment>
          )
        }
      ]}
    />
  ),
  name: 'Mixed actions'
};

export const NoBorders: Story = {
  args: { classModifiers: 'no-border' },
  render: ({ ...props }) => (
    <SummaryList
      {...props}
      items={[
        {
          name: 'Name',
          children: 'Sarah Philips'
        },
        {
          name: 'Date of birth',
          children: '5 January 1978'
        },
        {
          name: 'Address',
          children: (
            <Fragment>
              72 Guild Street
              <br />
              London
              <br />
              SE23 6FH
            </Fragment>
          )
        },
        {
          name: 'Contact details',
          children: (
            <Fragment>
              <p className="govuk-body">07700 900457</p>
              <p className="govuk-body">sarah.phillips@example.com</p>
            </Fragment>
          )
        }
      ]}
    />
  ),
  name: 'No borders'
};

export const MissingInfo: Story = {
  args: {},
  render: ({ ...props }) => (
    <SummaryList
      {...props}
      items={[
        {
          name: 'Name',
          actions: [
            {
              href: '#',
              children: (
                <Fragment>
                  Change<VisuallyHidden> name</VisuallyHidden>
                </Fragment>
              )
            }
          ],
          children: 'Sarah Philips'
        },
        {
          name: 'Date of birth',
          actions: [
            {
              href: '#',
              children: (
                <Fragment>
                  Change<VisuallyHidden> date of birth</VisuallyHidden>
                </Fragment>
              )
            }
          ],
          children: '5 January 1978'
        },
        {
          name: 'Contact information',
          children: <A href="#">Enter contact information</A>
        },
        {
          name: 'Contact details',
          children: <A href="#">Enter contact details</A>
        }
      ]}
    />
  ),
  name: 'Missing info'
};

export const Cards: Story = {
  args: {},
  render: ({ ...props }) => (
    <>
      <SummaryCard title="Lead tenant">
        <SummaryList
          {...props}
          items={[
            {
              name: 'Age',
              actions: [
                {
                  href: '#',
                  children: (
                    <Fragment>
                      Change<VisuallyHidden> age</VisuallyHidden>
                    </Fragment>
                  )
                }
              ],
              children: '38'
            },
            {
              name: 'Nationality',
              actions: [
                {
                  href: '#',
                  children: (
                    <Fragment>
                      Change<VisuallyHidden> nationality</VisuallyHidden>
                    </Fragment>
                  )
                }
              ],
              children: 'UK national resident in UK'
            },
            {
              name: 'Working situation',
              actions: [
                {
                  href: '#',
                  children: (
                    <Fragment>
                      Change<VisuallyHidden> working situation</VisuallyHidden>
                    </Fragment>
                  )
                }
              ],
              children: 'Part time – less than 30 hours a week'
            }
          ]}
        />
      </SummaryCard>
      <SummaryCard title="Person 2">
        <SummaryList
          items={[
            {
              name: 'Details known',
              actions: [
                {
                  href: '#',
                  children: (
                    <Fragment>
                      Change
                      <VisuallyHidden>
                        {' '}
                        whether details are known
                      </VisuallyHidden>
                    </Fragment>
                  )
                }
              ],
              children: 'Yes'
            },
            {
              name: 'Relationship to lead tenant',
              actions: [
                {
                  href: '#',
                  children: (
                    <Fragment>
                      Change
                      <VisuallyHidden> relationship to tenant</VisuallyHidden>
                    </Fragment>
                  )
                }
              ],
              children: 'Partner'
            },
            {
              name: 'Age',
              actions: [
                {
                  href: '#',
                  children: (
                    <Fragment>
                      Change<VisuallyHidden> age</VisuallyHidden>
                    </Fragment>
                  )
                }
              ],
              children: '42'
            },
            {
              name: 'Working situation',
              actions: [
                {
                  href: '#',
                  children: (
                    <Fragment>
                      Change<VisuallyHidden> working situation</VisuallyHidden>
                    </Fragment>
                  )
                }
              ],
              children:
                'Unable to work because of long-term sickness or disability'
            }
          ]}
        />
      </SummaryCard>
      <SummaryCard title="Person 3">
        <SummaryList
          items={[
            {
              name: 'Details known',
              actions: [
                {
                  href: '#',
                  children: (
                    <Fragment>
                      Change
                      <VisuallyHidden>
                        {' '}
                        whether details are known
                      </VisuallyHidden>
                    </Fragment>
                  )
                }
              ],
              children: 'Yes'
            },
            {
              name: 'Relationship to lead tenant',
              actions: [
                {
                  href: '#',
                  children: (
                    <Fragment>
                      Change
                      <VisuallyHidden> relationship to tenant</VisuallyHidden>
                    </Fragment>
                  )
                }
              ],
              children: 'Child'
            },
            {
              name: 'Age',
              actions: [
                {
                  href: '#',
                  children: (
                    <Fragment>
                      Change<VisuallyHidden> age</VisuallyHidden>
                    </Fragment>
                  )
                }
              ],
              children: '7'
            },
            {
              name: 'Working situation',
              actions: [
                {
                  href: '#',
                  children: (
                    <Fragment>
                      Change<VisuallyHidden> working situation</VisuallyHidden>
                    </Fragment>
                  )
                }
              ],
              children: 'Child under 16'
            }
          ]}
        />
      </SummaryCard>
    </>
  )
};

export const CardsWithActions: Story = {
  args: {},
  render: ({ ...props }) => (
    <>
      <SummaryCard
        title="University of Gloucestershire"
        actions={[
          {
            href: '#',
            children: (
              <Fragment>
                Delete choice
                <VisuallyHidden>
                  {' '}
                  of University of Gloucestershire
                </VisuallyHidden>
              </Fragment>
            )
          },
          {
            href: '#',
            children: (
              <Fragment>
                Withdraw
                <VisuallyHidden>
                  {' '}
                  from University of Gloucestershire
                </VisuallyHidden>
              </Fragment>
            )
          }
        ]}
      >
        <SummaryList
          {...props}
          items={[
            {
              name: 'Course',
              children: (
                <Fragment>
                  English (3DMD)
                  <br />
                  PGCE with QTS full time
                </Fragment>
              )
            },
            {
              name: 'Location',
              children: (
                <Fragment>
                  School name
                  <br />
                  Road, City, SW1 1AA
                </Fragment>
              )
            }
          ]}
        />
      </SummaryCard>
      <SummaryCard
        title="University of Bristol"
        actions={[
          {
            href: '#',
            children: (
              <Fragment>
                Delete choice
                <VisuallyHidden> of University of Bristol</VisuallyHidden>
              </Fragment>
            )
          },
          {
            href: '#',
            children: (
              <Fragment>
                Withdraw
                <VisuallyHidden> from University of Bristol</VisuallyHidden>
              </Fragment>
            )
          }
        ]}
      >
        <SummaryList
          items={[
            {
              name: 'Course',
              children: (
                <Fragment>
                  English (Q3X1)
                  <br />
                  PGCE with QTS full time
                </Fragment>
              )
            },
            {
              name: 'Location',
              children: (
                <Fragment>
                  School name
                  <br />
                  Road, City, SW2 1AA
                </Fragment>
              )
            }
          ]}
        />
      </SummaryCard>
    </>
  ),
  name: 'Cards with actions'
};
