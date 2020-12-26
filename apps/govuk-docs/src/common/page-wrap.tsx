import { FC, Fragment, createElement as h } from 'react';
import { PageProps } from '@not-govuk/app-composer';
import { A, NotGovUKPage } from '@not-govuk/components';

import './app.scss';

export const PageWrap: FC<PageProps> = ({ children }) => {
  const navigation = [
    { href: '/get-started', text: 'Get started' },
    { href: '/styles', text: 'Styles' },
    { href: '/components', text: 'Components' },
    { href: '/contributing', text: 'Contributing' }
  ];

  return (
    <NotGovUKPage
      feedbackHref="/feedback"
      navigation={navigation}
      phase="alpha"
      serviceName="NotGovUK"
    >
      {children}
    </NotGovUKPage>
  );
};

export default PageWrap;
