import { FC, Fragment, createElement as h } from 'react';
import { Helmet } from 'react-helmet-async';
import { PageProps } from '@not-govuk/app-composer';

import {
  StartButton
} from '@not-govuk/components';

const Page: FC<PageProps> = () => (
  <Fragment>
    <Helmet>
      <title>Home - NotGovUK</title>
    </Helmet>
    <h1>This is NOT GovUK!</h1>
    <p className="lead">Whilst this site might <em>look</em> like GovUK it is in fact <strong>NOT</strong> GovUK.</p>
    <StartButton href="/forms" />
  </Fragment>
);

export default Page;
export const title = 'Home';
