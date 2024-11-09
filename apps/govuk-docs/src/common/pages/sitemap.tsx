import { FC, Fragment, createElement as h } from 'react';
import { Helmet } from 'react-helmet-async';
import { PageProps } from '@not-govuk/app-composer';
import { A } from '@not-govuk/components';
import { AnchorList } from '@not-govuk/anchor-list';
import { componentLinks, styleLinks } from '../stories';
import config from '../config';

const siteTitle = config.title;

export const title = 'Sitemap';
const description = `Overview of ${siteTitle}`;

const Page: FC<PageProps> = () => (
  <Fragment>
    <Helmet>
      <title>{title} - {siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="og:title" content={title} />
      <meta name="og:description" content={description} />
    </Helmet>
    <h1>{title}</h1>
    <h2><A href="/">About NotGovUK</A></h2>
    <AnchorList classBlock="govuk-list" items={[
      { href: '/design-decisions', text: 'Design decisions' }
    ]} />
    <h2><A href="/get-started">Get started</A></h2>
    <AnchorList classBlock="govuk-list" items={[
      { href: '/working-on-your-project', text: 'Working on your project' }
    ]} />
    <h2><A href="/styles">Styles</A></h2>
    <AnchorList classBlock="govuk-list" items={styleLinks} />
    <h2><A href="/components">Components</A></h2>
    <AnchorList classBlock="govuk-list" items={componentLinks} />
    <h2><A href="/contributing">Contributing</A></h2>
  </Fragment>
);

export default Page;
