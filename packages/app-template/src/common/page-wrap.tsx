import * as React from 'react';
import { Page as TPage } from '@not-govuk/app-composer';
import { Page } from '@not-govuk/components';

import './app.scss';

export const PageWrap: TPage = ({ routes, children }) => {
  const compare = (a, b) => (
    a.href > b.href
    ? 1
    : -1
  );
  const navigation = routes
    .map(e => ({
      href: e.href,
      text: e.title
    }))
    .sort(compare);

  return (
    <Page
      feedbackHref="/feedback"
      navigation={navigation}
      phase="alpha"
      title="NotGovUK"
    >
      {children}
    </Page>
  );
};

export default PageWrap;
