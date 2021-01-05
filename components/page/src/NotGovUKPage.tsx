import { FC, createElement as h } from 'react';
import { Helmet } from 'react-helmet-async';
import { Page, PageProps } from './Page';

import '../assets/NotGovUKPage.scss';

const favicon = require('../assets/coat-favicon.ico').default;
const appleTouchIcon180 = require('../assets/coat-apple-touch-icon-180x180.png').default;
const appleTouchIcon167 = require('../assets/coat-apple-touch-icon-167x167.png').default;
const appleTouchIcon152 = require('../assets/coat-apple-touch-icon-152x152.png').default;
const appleTouchIcon = require('../assets/coat-apple-touch-icon.png').default;
const ogImage = require('../assets/coat-opengraph-image.png').default;

export type NotGovUKPageProps = Omit<PageProps, 'govUK'>;

export const NotGovUKPage: FC<NotGovUKPageProps> = ({ children, classModifiers, ...props }) => (
  <Page
    {...props}
    classModifiers={[ ...(Array.isArray(classModifiers) ? classModifiers : [classModifiers]), 'not-govuk' ]}
    govUK={false}
  >
    <Helmet>
      <meta name="theme-color" content="#0b0c0c" />
      <link rel="shortcut icon" sizes="16x16 32x32 48x48" href={favicon} type="image/x-icon" />
      <link rel="apple-touch-icon" sizes="180x180" href={appleTouchIcon180} />
      <link rel="apple-touch-icon" sizes="167x167" href={appleTouchIcon167} />
      <link rel="apple-touch-icon" sizes="152x152" href={appleTouchIcon152} />
      <link rel="apple-touch-icon" href={appleTouchIcon} />
      <meta property="og:image" content={ogImage} />
    </Helmet>
    {children}
  </Page>
);

export default NotGovUKPage;
