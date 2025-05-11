/// <reference path='./bundler.d.ts' />
'use client';

import { FC, createElement as h } from 'react';
import { Head } from '@not-govuk/head';
import { Page, PageProps } from './Page';
import { unwrapImage } from './types';

import iFavicon from '../assets/coat-favicon.ico';
import iAppleTouchIcon180 from '../assets/coat-apple-touch-icon-180x180.png';
import iAppleTouchIcon167 from '../assets/coat-apple-touch-icon-167x167.png';
import iAppleTouchIcon152 from '../assets/coat-apple-touch-icon-152x152.png';
import iAppleTouchIcon from '../assets/coat-apple-touch-icon.png';
import iOGImage from '../assets/coat-opengraph-image.png';

const favicon = unwrapImage(iFavicon);
const appleTouchIcon180 = unwrapImage(iAppleTouchIcon180);
const appleTouchIcon167 = unwrapImage(iAppleTouchIcon167);
const appleTouchIcon152 = unwrapImage(iAppleTouchIcon152);
const appleTouchIcon = unwrapImage(iAppleTouchIcon);
const ogImage = unwrapImage(iOGImage);

import '../assets/NotGovUKPage.scss';

export type NotGovUKPageProps = Omit<PageProps, 'govUK'>;

export const NotGovUKPage: FC<NotGovUKPageProps> = ({ children, classModifiers, rebrand = false, ...props }) => (
  <Page
    {...props}
    classModifiers={[ ...(Array.isArray(classModifiers) ? classModifiers : [classModifiers]), 'not-govuk' ]}
    govUK={false}
    rebrand={rebrand}
  >
    <Head>
      <meta name="theme-color" content={ rebrand ? '#1d70b8' : '#0b0c0c' } />
      <link rel="shortcut icon" sizes="16x16 32x32 48x48" href={favicon} type="image/x-icon" />
      <link rel="apple-touch-icon" sizes="180x180" href={appleTouchIcon180} />
      <link rel="apple-touch-icon" sizes="167x167" href={appleTouchIcon167} />
      <link rel="apple-touch-icon" sizes="152x152" href={appleTouchIcon152} />
      <link rel="apple-touch-icon" href={appleTouchIcon} />
      <meta property="og:image" content={ogImage} />
    </Head>
    {children}
  </Page>
);

export default NotGovUKPage;
