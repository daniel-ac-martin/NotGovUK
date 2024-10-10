'use client';

import { FC, createElement as h } from 'react';
import { Head } from '@not-govuk/head';
import { Page, PageProps } from './Page';

import favicon from '../assets/coat-favicon.ico';
import appleTouchIcon180 from '../assets/coat-apple-touch-icon-180x180.png';
import appleTouchIcon167 from '../assets/coat-apple-touch-icon-167x167.png';
import appleTouchIcon152 from '../assets/coat-apple-touch-icon-152x152.png';
import appleTouchIcon from '../assets/coat-apple-touch-icon.png';
import ogImage from '../assets/coat-opengraph-image.png';

import '../assets/NotGovUKPage.scss';


export type NotGovUKPageProps = Omit<PageProps, 'govUK'>;

export const NotGovUKPage: FC<NotGovUKPageProps> = ({ children, classModifiers, ...props }) => (
  <Page
    {...props}
    classModifiers={[ ...(Array.isArray(classModifiers) ? classModifiers : [classModifiers]), 'not-govuk' ]}
    govUK={false}
  >
    <Head>
      <meta name="theme-color" content="#0b0c0c" />
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
