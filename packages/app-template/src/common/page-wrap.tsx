import * as React from 'react';
import { Page as TPage } from '@not-govuk/app-composer';
import { Page } from '@not-govuk/components';

if (process.env.WEBPACK) require('./app.scss');

export const PageWrap: TPage = ({ routes, children }) => {
  const navigation = routes.map(e => ({
    href: e.href,
    text: e.title
  }));

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
