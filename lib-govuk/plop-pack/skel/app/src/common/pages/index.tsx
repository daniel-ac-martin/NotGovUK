import { FC, createElement as h } from 'react';
import { Helmet } from 'react-helmet-async';
import { PageProps } from '@not-govuk/app-composer';
import config from '../config.js';

const siteTitle = config.title;

export const title = 'Home';
const description = 'Our homepage';

const Page: FC<PageProps> = props => (
  <div className="govuk-grid-row">
    <Helmet>
      <title>{title} - {siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="og:title" content={title} />
      <meta name="og:description" content={description} />
    </Helmet>
    <div className="govuk-grid-column-two-thirds">
      <h1>{title}</h1>
      <p>This is the home page.</p>
    </div>
  </div>
);

export default Page;
