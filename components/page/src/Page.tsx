'use client';

import { FC, Fragment, HTMLProps, ReactNode, createElement as h } from 'react';
import { BackLink } from '@not-govuk/back-link';
import { Breadcrumb, Breadcrumbs } from '@not-govuk/breadcrumbs';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';
import { Footer, FooterProps, NavMenu } from '@not-govuk/footer';
import { Head } from '@not-govuk/head';
import { Header, HeaderProps } from '@not-govuk/header';
import { A } from '@not-govuk/link';
import { PhaseBanner, PhaseBannerProps } from '@not-govuk/phase-banner';
import { SkipLink } from '@not-govuk/skip-link';
import { WidthContainer } from '@not-govuk/width-container';

import '../assets/Page.scss';

export type PageProps = (
  StandardProps &
  HTMLProps<HTMLDivElement> &
  HeaderProps &
  Omit<FooterProps, 'navigation'> &
  Partial<PhaseBannerProps> &
  {
    /** Location for the Back link */
    backHref?: string
    /** List of links to parent pages */
    breadcrumbs?: Breadcrumb[]
    /** The content that displays in the page. */
    children?: ReactNode
    /** HRef for providing feedback on the service */
    feedbackHref?: string
    /** Content for the footer */
    footerContent?: ReactNode
    /** Content for the footer */
    footerNavigation?: NavMenu[]
    /** Content for the phase-banner */
    phaseBannerContent?: ReactNode
    /** Title of the HTML page (can be overridden via Helmet  */
    title?: string
  }
);

export const Page: FC<PageProps> = ({
  backHref,
  breadcrumbs,
  children,
  classBlock,
  classModifiers: _classModifiers,
  className,
  department,
  feedbackHref,
  footerContent,
  footerNavigation,
  govUK,
  logo,
  maxContentsWidth,
  meta,
  metaTitle,
  navigation,
  organisationHref,
  organisationText,
  phase,
  phaseBannerContent,
  serviceHref,
  serviceName,
  signOutHref,
  signOutText,
  title: _title,
  ...attrs
}) => {
  const classModifiers = (
    Array.isArray(_classModifiers)
      ? _classModifiers
      : [_classModifiers]
  );
  const classes = classBuilder('not-govuk-page', classBlock, [...classModifiers, department], className);
  const title = _title || serviceName || 'NotGovUK';
  const headerProps = {
    department,
    govUK,
    logo,
    maxContentsWidth,
    navigation,
    organisationHref,
    organisationText,
    serviceHref,
    serviceName,
    signOutHref,
    signOutText
  };
  const footerProps = {
    govUK,
    maxContentsWidth,
    meta,
    metaTitle,
    navigation: footerNavigation
  };
  const mainId = 'main-content';

  return (
    <div {...attrs} className={classes()}>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>
      <SkipLink id="skip-link" for={mainId}>Skip to main content</SkipLink>
      <Header {...headerProps} className={classes('header')} />
      <div className={classes('body')}>
        <WidthContainer maxWidth={maxContentsWidth} className={classes('container')}>
          { !phase ? null : (
            <PhaseBanner id="phase-banner" phase={phase}>
              { phaseBannerContent || (
                <Fragment>
                  This is a new service - your {
                    feedbackHref
                      ? (<A href={feedbackHref}>feedback</A>)
                      : 'feedback'
                  } will help us to improve it.
                </Fragment>
              ) }
            </PhaseBanner>
          ) }
          { breadcrumbs?.length
            ? (
              <Breadcrumbs id="breadcrumbs" items={breadcrumbs} />
            )
            : ( !backHref ? null : (
              <BackLink id="back-link" href={backHref} />
            ) )
          }
          <main id={mainId} className={classes('main')}>
            {children}
          </main>
        </WidthContainer>
      </div>
      <Footer {...footerProps} className={classes('footer')}>{footerContent}</Footer>
    </div>
  );
};

export default Page;
