/// <reference path='./bundler.d.ts' />
'use client';

import { FC, Fragment, createElement as h } from 'react';
import { Head } from '@not-govuk/head';
import { Page, PageProps } from './Page';
import { unwrapImage } from './types';

import iFavicon from 'govuk-frontend/dist/govuk/assets/images/favicon.ico';
import iFaviconSVG from 'govuk-frontend/dist/govuk/assets/images/favicon.svg';
import iMaskIcon from 'govuk-frontend/dist/govuk/assets/images/govuk-icon-mask.svg';
import iAppleTouchIcon180 from 'govuk-frontend/dist/govuk/assets/images/govuk-icon-180.png';
import iOGImage from 'govuk-frontend/dist/govuk/assets/images/govuk-opengraph-image.png';

const faviconOld = unwrapImage(iFavicon);
const faviconSVGOld = unwrapImage(iFaviconSVG);
const maskIconOld = unwrapImage(iMaskIcon);
const appleTouchIcon180Old = unwrapImage(iAppleTouchIcon180);
const ogImageOld = unwrapImage(iOGImage);

import iFaviconRebrand from 'govuk-frontend/dist/govuk/assets/rebrand/images/favicon.ico';
import iFaviconSVGRebrand from 'govuk-frontend/dist/govuk/assets/rebrand/images/favicon.svg';
import iMaskIconRebrand from 'govuk-frontend/dist/govuk/assets/rebrand/images/govuk-icon-mask.svg';
import iAppleTouchIcon180Rebrand from 'govuk-frontend/dist/govuk/assets/rebrand/images/govuk-icon-180.png';
import iOGImageRebrand from 'govuk-frontend/dist/govuk/assets/rebrand/images/govuk-opengraph-image.png';

const favicon = unwrapImage(iFaviconRebrand);
const faviconSVG = unwrapImage(iFaviconSVGRebrand);
const maskIcon = unwrapImage(iMaskIconRebrand);
const appleTouchIcon180 = unwrapImage(iAppleTouchIcon180Rebrand);
const ogImage = unwrapImage(iOGImageRebrand);

import '../assets/GovUKPage.scss';

export type GovUKPageProps = Omit<PageProps, 'govUK'>;

export const GovUKPage: FC<GovUKPageProps> = ({ children, classModifiers, rebrand = false, ...props }) => (
  <Page
    {...props}
    classModifiers={[ ...(Array.isArray(classModifiers) ? classModifiers : [classModifiers]), 'govuk' ]}
    govUK={true}
    rebrand={rebrand}
  >
    <Head>
      <meta name="theme-color" content={rebrand ? '#1d70b8' : '#0b0c0c'} />
      {rebrand ? (
        <Fragment>
          <link rel="icon" sizes="48x48" href={favicon} />
          <link rel="icon" sizes="any" href={faviconSVG} type="image/svg+xml" />
          <link rel="mask-icon" href={maskIcon} color="#0b0c0c" />
          <link rel="apple-touch-icon" href={appleTouchIcon180} />
          <meta property="og:image" content={ogImage} />
        </Fragment>
      ) : (
        <Fragment>
          <link rel="icon" sizes="48x48" href={faviconOld} />
          <link rel="icon" sizes="any" href={faviconSVGOld} type="image/svg+xml" />
          <link rel="mask-icon" href={maskIconOld} color="#0b0c0c" />
          <link rel="apple-touch-icon" href={appleTouchIcon180Old} />
          <meta property="og:image" content={ogImageOld} />
        </Fragment>
      )}
    </Head>
    {children}
  </Page>
);

export default GovUKPage;
