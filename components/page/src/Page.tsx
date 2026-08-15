'use client';

import { FC, Fragment, HTMLProps, ReactNode, createElement as h } from 'react';
import { BackLink } from '@not-govuk/back-link';
import { Breadcrumb, Breadcrumbs } from '@not-govuk/breadcrumbs';
import { StandardProps, classBuilder } from '@react-foundry/component-helpers';
import { useIsMounted } from '@react-foundry/client-component-helpers';
import { Footer, FooterProps, NavMenu } from '@not-govuk/footer';
import { GenericHeader, GenericHeaderProps } from '@not-govuk/generic-header';
import { Header, HeaderProps } from '@not-govuk/header';
import { A } from '@not-govuk/link';
import { PhaseBanner, PhaseBannerProps } from '@not-govuk/phase-banner';
import { ServiceNavigation, ServiceNavigationProps } from '@not-govuk/service-navigation';
import { SkipLink } from '@not-govuk/skip-link';
import { WidthContainer } from '@not-govuk/width-container';

import '../assets/Page.scss';

export type PageProps = (
  StandardProps &
  HTMLProps<HTMLDivElement> &
  GenericHeaderProps &
  Omit<ServiceNavigationProps, 'items'> &
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
    /** Navigation items */
    navigation?: ServiceNavigationProps['items']
    /** Content for the phase-banner */
    phaseBannerContent?: ReactNode
  }
);

export const Page: FC<PageProps> = ({
  backHref,
  breadcrumbs,
  children,
  classBlock,
  classModifiers: _classModifiers,
  className: _className,
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
  ...attrs
}) => {
  const classModifiers = [...(
    Array.isArray(_classModifiers)
      ? _classModifiers
      : [_classModifiers]
  ), department];
  const className = _className || '';
  const classes = classBuilder('govuk-template', classBlock, classModifiers, className);
  const commonHeaderProps = {
    maxContentsWidth,
    organisationHref
  };
  const navigationProps = {
    maxContentsWidth,
    items: navigation,
    serviceHref,
    serviceName,
    signOutHref,
    signOutText
  };
  const footerProps = {
    department,
    govUK,
    maxContentsWidth,
    meta,
    metaTitle,
    navigation: footerNavigation
  };
  const showNavigation = navigation?.length || serviceName;
  const mainId = 'main-content';
  const header = (
    govUK
    ? (
      <Header {...commonHeaderProps} />
    )
    : (
      <GenericHeader {...commonHeaderProps} department={department} logo={logo} organisationText={organisationText} />
    )
  );
  const isMounted = useIsMounted();

  return (
    <div {...attrs} className={classes('page', classModifiers, className + (!isMounted ? '' : ' govuk-frontend-supported'))}>
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      <SkipLink id="skip-link" for={mainId}>Skip to main content</SkipLink>
      <header className={classes('header')}>
        {header}
        { !showNavigation ? null : (
          <ServiceNavigation {...navigationProps} className={classes('navigation')} />
        ) }
        { !phase ? null : (
            <PhaseBanner id="phase-banner" phase={phase} maxWidth={maxContentsWidth}>
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
      </header>
      <div className={classes('middle')}>
        <WidthContainer maxWidth={maxContentsWidth} className={classes('container')}>
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
      <footer className={classes('footer')}>
        <Footer {...footerProps}>{footerContent}</Footer>
      </footer>
    </div>
  );
};

export default Page;
