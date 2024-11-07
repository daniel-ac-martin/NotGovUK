import { FC, Fragment, createElement as h } from 'react';
import { Helmet } from 'react-helmet-async';
import { PageProps } from '@not-govuk/app-composer';

import {
  StartButton
} from '@not-govuk/components';
import config from '../config';

const siteTitle = config.title;

export const title = 'Home';
const description = 'Our homepage';

const Page: FC<PageProps> = () => (
  <Fragment>
    <Helmet>
      <title>{title} - {siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="og:title" content={title} />
      <meta name="og:description" content={description} />
    </Helmet>
    <h1>This is NOT GovUK!</h1>
    <p className="lead">Whilst this site might <em>look</em> like GovUK it is in fact <strong>NOT</strong> GovUK.</p>
    <StartButton href="/forms" />
  </Fragment>
);

export default Page;
