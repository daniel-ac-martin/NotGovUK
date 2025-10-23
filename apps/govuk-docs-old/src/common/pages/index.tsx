import { FC, Fragment, createElement as h } from 'react';
import { Helmet } from 'react-helmet-async';
import { PageProps } from '@not-govuk/app-composer';

import Markdown from '../../../../../docs/about.md';

export const title = 'NotGovUK';
const description = 'An implementation of the GOV.UK Design System in React that provides support for writing internal applications in addition to public ones';

const Page: FC<PageProps> = () => (
  <Fragment>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="og:title" content={title} />
      <meta name="og:description" content={description} />
    </Helmet>
    <Markdown />
  </Fragment>
);

export default Page;
