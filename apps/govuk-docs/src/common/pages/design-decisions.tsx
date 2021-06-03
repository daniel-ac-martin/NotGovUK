import { FC, Fragment, createElement as h } from 'react';
import { Helmet } from 'react-helmet-async';
import { PageProps } from '@not-govuk/app-composer';

import Markdown from '../../../../../docs/design-decisions.md';

export const title = 'Design decisions';
const section = 'About NotGovUK';

const Page: FC<PageProps> = props => (
  <Fragment>
    <Helmet>
      <title>{title} - NotGovUK</title>
      <meta name="og:article:section" content={section} />
    </Helmet>
    <span className="govuk-caption-xl">{section}</span>
    <Markdown />
  </Fragment>
);

export default Page;
