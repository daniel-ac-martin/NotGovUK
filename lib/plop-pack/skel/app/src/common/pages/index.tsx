import { FC, Fragment, createElement as h } from 'react';
import { Helmet } from 'react-helmet-async';
import { PageProps } from '@not-govuk/app-composer';
import config from '../config';

const siteTitle = config.title;

export const title = 'Home';
const description = 'Our homepage';

const Page: FC<PageProps> = props => (
  <Fragment>
    <Helmet>
      <title>{title} - {siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="og:title" content={title} />
      <meta name="og:description" content={description} />
    </Helmet>
    <h1>{title}</h1>
    <p>This is the home page.</p>
  </Fragment>
);

export default Page;
