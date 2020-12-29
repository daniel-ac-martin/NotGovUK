NotGovUK - Page
===============

A fully branded page with content sandwiched between the header and footer.


Using this package
------------------

First install the package into your project:

```shell
npm install -S @not-govuk/page
```

Then use it in your code as follows:

```js
import React, { createElement as h } from 'react';
import Page from '@not-govuk/page';

export const MyComponent = props => (
  <NotGovUKPage
    breadcrumbs={[
      { href: '', text: 'Home' },
      { href: '', text: 'Passports, travel and living abroad' },
      { href: '', text: 'Travel abroad' },
    ]}
    department="home-office"
    feedbackHref="#feedback"
    footerContent={<p>Built by the <a href="https://www.gov.uk">Government Digital Service</a>.</p>}
    footerNavigation={[
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
    ]}
    meta={[
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
    ]}
    phase="alpha"
    navigation={[
      { href: '#one', text: 'One', active: true },
      { href: 'two', text: 'Two' },
      { href: 'three', text: 'Three' },
      { href: 'four', text: 'Four' }
    ]}
    organisationHref="#"
    phase="alpha"
    serviceName="Service name"
    serviceHref="#"
  >
    My page.
  </NotGovUKPage>
);

export default MyComponent;
```


Working on this package
-----------------------

Before working on this package you must install its dependencies using
the following command:

```shell
pnpm install
```


### Testing

```shell
npm test
```


### Building

```shell
npm run build
```


### Clean-up

```shell
npm run clean
```
