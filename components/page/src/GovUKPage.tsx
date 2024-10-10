/// <reference path='./bundler.d.ts' />
'use client';

import { FC, createElement as h } from 'react';
import { Head } from '@not-govuk/head';
import { Page, PageProps } from './Page';
import { unwrapImage } from './types';

import iFavicon from 'govuk-frontend/dist/govuk/assets/images/favicon.ico';
import iFaviconSVG from 'govuk-frontend/dist/govuk/assets/images/favicon.svg';
import iMaskIcon from 'govuk-frontend/dist/govuk/assets/images/govuk-icon-mask.svg';
import iAppleTouchIcon180 from 'govuk-frontend/dist/govuk/assets/images/govuk-icon-180.png';
import iOGImage from 'govuk-frontend/dist/govuk/assets/images/govuk-opengraph-image.png';

const favicon = unwrapImage(iFavicon);
const faviconSVG = unwrapImage(iFaviconSVG);
const maskIcon = unwrapImage(iMaskIcon);
const appleTouchIcon180 = unwrapImage(iAppleTouchIcon180);
const ogImage = unwrapImage(iOGImage);

import '../assets/GovUKPage.scss';

export type GovUKPageProps = Omit<PageProps, 'govUK'>;

export const GovUKPage: FC<GovUKPageProps> = ({ children, classModifiers, ...props }) => (
  <Page
    {...props}
    classModifiers={[ ...(Array.isArray(classModifiers) ? classModifiers : [classModifiers]), 'govuk' ]}
    govUK={true}
  >
    <Head>
      <meta name="theme-color" content="#0b0c0c" />
      <link rel="icon" sizes="48x48" href={favicon} />
      <link rel="icon" sizes="any" href={faviconSVG} type="image/svg+xml" />
      <link rel="mask-icon" href={maskIcon} color="#0b0c0c" />
      <link rel="apple-touch-icon" href={appleTouchIcon180} />
      <meta property="og:image" content={ogImage} />
    </Head>
    {children}
  </Page>
);

export default GovUKPage;
