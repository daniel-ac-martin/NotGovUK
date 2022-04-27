import { FC, createElement as h } from 'react';
import { Helmet } from 'react-helmet-async';
import { Page, PageProps } from './Page';

import '../assets/GovUKPage.scss';

const favicon = require('govuk-frontend/govuk/assets/images/favicon.ico');
const maskIcon = require('govuk-frontend/govuk/assets/images/govuk-mask-icon.svg');
const appleTouchIcon180 = require('govuk-frontend/govuk/assets/images/govuk-apple-touch-icon-180x180.png');
const appleTouchIcon167 = require('govuk-frontend/govuk/assets/images/govuk-apple-touch-icon-167x167.png');
const appleTouchIcon152 = require('govuk-frontend/govuk/assets/images/govuk-apple-touch-icon-152x152.png');
const appleTouchIcon = require('govuk-frontend/govuk/assets/images/govuk-apple-touch-icon.png');
const ogImage = require('govuk-frontend/govuk/assets/images/govuk-opengraph-image.png');

export type GovUKPageProps = Omit<PageProps, 'govUK'>;

export const GovUKPage: FC<GovUKPageProps> = ({ children, classModifiers, ...props }) => (
  <Page
    {...props}
    classModifiers={[ ...(Array.isArray(classModifiers) ? classModifiers : [classModifiers]), 'govuk' ]}
    govUK={true}
  >
    <Helmet>
      <meta name="theme-color" content="#0b0c0c" />
      <link rel="shortcut icon" sizes="16x16 32x32 48x48" href={favicon} type="image/x-icon" />
      <link rel="mask-icon" href={maskIcon} color="#0b0c0c" />
      <link rel="apple-touch-icon" sizes="180x180" href={appleTouchIcon180} />
      <link rel="apple-touch-icon" sizes="167x167" href={appleTouchIcon167} />
      <link rel="apple-touch-icon" sizes="152x152" href={appleTouchIcon152} />
      <link rel="apple-touch-icon" href={appleTouchIcon} />
      <meta property="og:image" content={ogImage} />
    </Helmet>
    {children}
  </Page>
);

export default GovUKPage;
