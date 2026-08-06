/// <reference path='./bundler.d.ts' />
'use client';

import { FC, createElement as h } from 'react';
import { Page, PageProps } from './Page';
import { unwrapImage } from './types';

import iFavicon from '../assets/coat-favicon.ico';
import iFaviconSVG from '../assets/coat-favicon.svg';
import iMaskIcon from '../assets/coat-icon-mask.svg';
import iAppleTouchIcon180 from '../assets/coat-icon-180.png';
import iOGImage from '../assets/coat-opengraph-image.png';

const favicon = unwrapImage(iFavicon);
const faviconSVG = unwrapImage(iFaviconSVG);
const maskIcon = unwrapImage(iMaskIcon);
const appleTouchIcon180 = unwrapImage(iAppleTouchIcon180);
const ogImage = unwrapImage(iOGImage);

import '../assets/NotGovUKPage.scss';

export type NotGovUKPageProps = Omit<PageProps, 'govUK'>;

// FIXME: Under the re-brand, theme-color should be set to the departmental colour
export const NotGovUKPage: FC<NotGovUKPageProps> = ({ children, classModifiers, ...props }) => (
  <Page
    {...props}
    classModifiers={[ ...(Array.isArray(classModifiers) ? classModifiers : [classModifiers]), 'not-govuk' ]}
    govUK={false}
  >
    <meta name="theme-color" content={'#0b0c0c'} />
    <link rel="icon" sizes="16x16 32x32 48x48" href={favicon} />
    <link rel="icon" sizes="any" href={faviconSVG} type="image/svg+xml" />
    <link rel="mask-icon" href={maskIcon} color={'#0b0c0c'} />
    <link rel="apple-touch-icon" href={appleTouchIcon180} />
    <meta property="og:image" content={ogImage} />
    {children}
  </Page>
);

export default NotGovUKPage;
