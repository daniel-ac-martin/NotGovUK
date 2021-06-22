import { FC, Fragment, createElement as h } from 'react';
import { Helmet } from 'react-helmet-async';
import { PageProps } from '@not-govuk/app-composer';
import { AnchorList } from '@not-govuk/anchor-list';
import config from '../config';

const siteTitle = config.title;

export const title = 'Sitemap';
const description = `Overview of ${siteTitle}`;

const Page: FC<PageProps> = ({ routes }) => {
  const compare = (a, b) => (
    a.href > b.href
           ? 1
           : -1
  );
  const pages = routes
    .map(e => ({
      href: e.href,
      text: e.title
    }))
    .sort(compare);

  return (
    <Fragment>
      <Helmet>
        <title>{title} - {siteTitle}</title>
        <meta name="description" content={description} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={description} />
      </Helmet>
      <h1>{title}</h1>
      <AnchorList classBlock="govuk-list" items={pages} />
    </Fragment>
  );
};

export default Page;
