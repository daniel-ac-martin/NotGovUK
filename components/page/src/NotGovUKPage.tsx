import { FC, createElement as h } from 'react';
import { Helmet } from 'react-helmet-async';
import { Page, PageProps } from './Page';

import '../assets/NotGovUKPage.scss';

export type NotGovUKPageProps = Omit<PageProps, 'govUK'>;

export const NotGovUKPage: FC<NotGovUKPageProps> = ({ children, classModifiers, ...props }) => (
  <Page
    {...props}
    classModifiers={[ ...(Array.isArray(classModifiers) ? classModifiers : [classModifiers]), 'not-govuk' ]}
    govUK={false}
  >
    <Helmet>
      <meta name="theme-color" content="#0b0c0c" />
    </Helmet>
    {children}
  </Page>
);

export default NotGovUKPage;
