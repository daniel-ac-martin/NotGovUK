import { FC, createElement as h } from 'react';
import { Helmet } from 'react-helmet-async';
import { Page, PageProps } from './Page.js';

import favicon from 'govuk-frontend/govuk/assets/images/favicon.ico';
import maskIcon from 'govuk-frontend/govuk/assets/images/govuk-mask-icon.svg';
import appleTouchIcon180 from 'govuk-frontend/govuk/assets/images/govuk-apple-touch-icon-180x180.png';
import appleTouchIcon167 from 'govuk-frontend/govuk/assets/images/govuk-apple-touch-icon-167x167.png';
import appleTouchIcon152 from 'govuk-frontend/govuk/assets/images/govuk-apple-touch-icon-152x152.png';
import appleTouchIcon from 'govuk-frontend/govuk/assets/images/govuk-apple-touch-icon.png';
import ogImage from 'govuk-frontend/govuk/assets/images/govuk-opengraph-image.png';

import '../assets/GovUKPage.scss';

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
