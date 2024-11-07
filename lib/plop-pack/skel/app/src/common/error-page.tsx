import { FC, Fragment, createElement as h } from 'react';
import { Helmet } from 'react-helmet-async';
import { ErrorPageProps } from '@not-govuk/app-composer';

import config from './config';

const siteTitle = config.title;

export const ErrorPage: FC<ErrorPageProps> = ({ title, message }) => (
  <Fragment>
    <Helmet>
      <title>{title} - {siteTitle}</title>
    </Helmet>
    <h1>{title}</h1>
    <p>{message}</p>
  </Fragment>
);

export default ErrorPage;
