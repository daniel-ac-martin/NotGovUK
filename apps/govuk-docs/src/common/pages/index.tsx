import { FC, Fragment, createElement as h } from 'react';
import { Helmet } from 'react-helmet-async';
import { PageProps } from '@not-govuk/app-composer';

import Markdown from '../../../../../docs/about.md';

export const title = 'NotGovUK';

const Page: FC<PageProps> = props => (
  <Fragment>
    <Helmet>
      <title>{title}</title>
    </Helmet>
    <Markdown />
  </Fragment>
);

export default Page;
