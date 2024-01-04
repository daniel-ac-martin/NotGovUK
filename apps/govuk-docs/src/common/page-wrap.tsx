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
      feedbackHref="https://github.com/daniel-ac-martin/NotGovUK/issues/new"
      footerContent={(
        <Fragment>
          Copyright (C) 2019, 2020, 2021 Crown Copyright<br />
          Copyright (C) 2019, 2020, 2021 <A href="https://github.com/daniel-ac-martin">Daniel A.C. Martin</A><br />
          NotGovUK operates independently from <A href="https://gov.uk">GOV.UK</A> and is not affiliated, endorsed or supported by HM Government
        </Fragment>
      )}
      navigation={navigation}
      meta={[
        { href: "https://github.com/daniel-ac-martin/NotGovUK", text: "GitHub" },
        { href: "/sitemap", text: "Sitemap" },
        { href: "https://github.com/daniel-ac-martin/NotGovUK/issues/new", text: "Contact" },
      ]}
      organisationText="!GOV.UK"
      phase="alpha"
      serviceName="NotGovUK"
      title="NotGovUK"
      maxContentsWidth={1100}
    >
      {children}
    </NotGovUKPage>
  );
};

export default PageWrap;
