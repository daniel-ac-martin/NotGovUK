import { FC, createElement as h } from 'react';
import { PageProps } from '@not-govuk/app-composer';
import { GovUKPage } from '@not-govuk/components';

import './app.scss';

export const PageWrap: FC<PageProps> = ({ routes, children }) => {
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
    <GovUKPage
      feedbackHref="/feedback"
      navigation={navigation}
      phase="alpha"
      serviceName="NotGovUK"
      title="NotGovUK"
    >
      {children}
    </GovUKPage>
  );
};

export default PageWrap;
