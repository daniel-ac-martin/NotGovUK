import { FC, Fragment, createElement as h } from 'react';
import { Helmet } from 'react-helmet-async';
import { PageProps } from '@not-govuk/app-composer';

import Markdown from '../../../../../docs/design-decisions.md';

export const title = 'Design decisions';
const description = 'The rationale behind the design decisions made in NotGovUK';
const section = 'About NotGovUK';

const Page: FC<PageProps> = props => (
  <Fragment>
    <Helmet>
      <title>{title} - NotGovUK</title>
      <meta name="description" content={description} />
      <meta name="og:title" content={title} />
      <meta name="og:description" content={description} />
      <meta name="og:article:section" content={section} />
    </Helmet>
    <span className="govuk-caption-xl">{section}</span>
    <Markdown />
  </Fragment>
);

export default Page;
