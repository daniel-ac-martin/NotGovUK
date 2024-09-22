import { FC, createElement as h } from 'react';
import reactHelmetDefault, * as reactHelmetNamed from 'react-helmet-async';
import { Page, PageProps } from './Page';

import favicon from 'govuk-frontend/dist/govuk/assets/images/favicon.ico';
import faviconSVG from 'govuk-frontend/dist/govuk/assets/images/favicon.svg';
import maskIcon from 'govuk-frontend/dist/govuk/assets/images/govuk-icon-mask.svg';
import appleTouchIcon180 from 'govuk-frontend/dist/govuk/assets/images/govuk-icon-180.png';
import ogImage from 'govuk-frontend/dist/govuk/assets/images/govuk-opengraph-image.png';

import '../assets/GovUKPage.scss';

const reactHelmet = reactHelmetDefault || reactHelmetNamed;
const { Helmet } = reactHelmet;

export type GovUKPageProps = Omit<PageProps, 'govUK'>;

export const GovUKPage: FC<GovUKPageProps> = ({ children, classModifiers, ...props }) => (
  <Page
    {...props}
    classModifiers={[ ...(Array.isArray(classModifiers) ? classModifiers : [classModifiers]), 'govuk' ]}
    govUK={true}
  >
    <Helmet>
      <meta name="theme-color" content="#0b0c0c" />
      <link rel="icon" sizes="48x48" href={favicon} />
      <link rel="icon" sizes="any" href={faviconSVG} type="image/svg+xml" />
      <link rel="mask-icon" href={maskIcon} color="#0b0c0c" />
      <link rel="apple-touch-icon" href={appleTouchIcon180} />
      <meta property="og:image" content={ogImage} />
    </Helmet>
    {children}
  </Page>
);

export default GovUKPage;
