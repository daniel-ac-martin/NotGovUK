import { FC, Fragment, createElement as h } from 'react';
import { Helmet } from 'react-helmet-async';
import { PageProps } from '@not-govuk/app-composer';

import Markdown from '../../../../../docs/contributing.md';

export const title = 'Contributing';

const Page: FC<PageProps> = props => (
  <Fragment>
    <Helmet>
      <title>{title} - NotGovUK</title>
    </Helmet>
    <Markdown />
  </Fragment>
);

export default Page;
