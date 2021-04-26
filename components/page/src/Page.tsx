import { FC, Fragment, HTMLProps, ReactNode, createElement as h, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { BackLink } from '@not-govuk/back-link';
import { Breadcrumb, Breadcrumbs } from '@not-govuk/breadcrumbs';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';
import { Footer, FooterProps, NavMenu } from '@not-govuk/footer';
import { Header, HeaderProps } from '@not-govuk/header';
import { A } from '@not-govuk/link';
import { PhaseBanner, PhaseBannerProps } from '@not-govuk/phase-banner';
import { useIsMounted } from '@not-govuk/route-utils';
import { SkipLink } from '@not-govuk/skip-link';
import { WidthContainer } from '@not-govuk/width-container';

import '../assets/Page.scss';

// Note: This doesn't work with `npm run dev:ssr` as the asset is named differently.
const govUkFrontend = require('../assets/govuk-frontend-3.9.1.ext.min.js').default;

export type PageProps = (
  StandardProps &
  HTMLProps<HTMLDivElement> &
  HeaderProps &
  Omit<FooterProps, 'navigation'> &
  Partial<PhaseBannerProps> &
  {
    /** Location for the Back link */
    backHref?: string
    /** List of links */
    breadcrumbs?: Breadcrumb[]
    /** HRef for providing feedback on the service */
    feedbackHref?: string
    /** Content for the footer */
    footerContent?: ReactNode
    /** Content for the footer */
    footerNavigation?: NavMenu[]
    /** HTML prototyping support (adds the GDS JavaScript) */
    jsForHtml?: boolean
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
  jsForHtml = false,
  maxContentsWidth,
  meta,
  metaTitle,
  navigation,
  organisationHref,
  organisationText,
  phase,
  phaseBannerContent,
  serviceHref,
  serviceName: _serviceName,
  signOutHref,
  signOutText,
  title: _title,
  ...attrs
}) => {
  const isMounted = useIsMounted();
  const classModifiers = (
    Array.isArray(_classModifiers)
    ? _classModifiers
    : [_classModifiers]
  );
  const classes = classBuilder('not-govuk-page', classBlock, [ ...classModifiers, department ], className);
  const serviceName = _serviceName || _title;
  const title = _title || _serviceName || 'NotGovUK';
  const headerProps = {
    department,
    govUK,
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
  const doScripts = jsForHtml && !isMounted;

  useEffect(() =>{
    (window as any).GOVUKFrontend.initAll();
  } );

  return (
    <Fragment>
      { !doScripts ? null : (
          <script dangerouslySetInnerHTML={{ __html: 'document.body.className = (document.body.className ? document.body.className + \'js-enabled\' : \'js-enabled\');' }} />
      ) }
      <div {...attrs} className={classes()}>
        <Helmet>
          <title>{title}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        </Helmet>
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
            <main id={mainId} role="main" className={classes('main')}>
              {children}
            </main>
          </WidthContainer>
        </div>
        <Footer {...footerProps} className={classes('footer')}>{footerContent}</Footer>
      </div>
      { !doScripts ? null : (
          <Fragment>
            <script src={govUkFrontend} />
            <script dangerouslySetInnerHTML={{ __html: 'window.GOVUKFrontend.initAll();' }} />
          </Fragment>
      ) }
    </Fragment>
  );
};

export default Page;
