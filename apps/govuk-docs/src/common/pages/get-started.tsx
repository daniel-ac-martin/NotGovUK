import { FC, Fragment, createElement as h } from 'react';
import { Helmet } from 'react-helmet-async';
import { PageProps } from '@not-govuk/app-composer';

import Markdown from '../../../../../docs/get-started.md';

export const title = 'Get started';

const Page: FC<PageProps> = props => (
  <Fragment>
    <Helmet>
      <title>{title} - NotGovUK</title>
      <meta name="og:article:section" content={title} />
    </Helmet>
    <Markdown />
  </Fragment>
);

export default Page;
