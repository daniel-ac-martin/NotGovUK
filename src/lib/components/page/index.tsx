import * as React from 'react';
import { A, BackLink, Breadcrumbs, Footer, Header, PhaseBanner, SkipLink } from '../';
import { INavigationLink } from '../header';
import { IBreadcrumb } from '../breadcrumbs';

interface IPage {
  /** Location for the Back link */
  backHref?: string,
  /** List of links */
  breadcrumbs?: Array<IBreadcrumb>
  /** HRef for providing feedback on the service */
  feedbackHref?: string,
  /** Content for the footer */
  footerContent?: any,
  /** HRef for the Crown logo link */
  logoHref?: string,
  /** Navigation links */
  navigation?: Array<INavigationLink>,
  /** The phase the service is in */
  phase?: string
  /** Content for the phase-banner */
  phaseBannerContent?: any,
  /** List of side panels */
  sidePanels?: Array<any>,
  /** HRef for the sign-out link */
  signOutHref?: string,
  /** Text for the sign-out link */
  signOutText?: string,
  /** Service title */
  title?: string,
  /** Location linked to by the service title */
  titleHref?: string
};

export const Page: React.SFC<IPage> = props => {
  const backLink = (
    <BackLink href={props.backHref} />
  );
  const breadcrumbs = (
    <Breadcrumbs id="breadcrumbs" items={props.breadcrumbs} />
  );
  const phaseBanner = (
    <PhaseBanner id="phase-banner" phase={props.phase}>
      {props.phaseBannerContent || (
        <>
          This is a new service - your {props.feedbackHref ? (<A href={props.feedbackHref}>feedback</A>) : 'feedback'} will help us to improve it.
        </>
      )}
    </PhaseBanner>
  );

  return(
    <>
      <SkipLink id="skip-link" href="#content" />
      <Header
        id="top"
        logoHref={props.logoHref}
        navigation={props.navigation}
        signOutHref={props.signOutHref}
        signOutText={props.signOutText}
        title={props.title}
        titleHref={props.titleHref}
      />
      <div id="middle" className="page-body">
        <div className="inner">
          {props.phase ? phaseBanner : ''}
          {props.breadcrumbs.length ?
            breadcrumbs :
            props.backHref ? backLink : ''
          }
          <main id="content">
            {props.children}
          </main>
          {props.sidePanels.map(e => (
            <aside>
              {e}
            </aside>
          ))}
        </div>
      </div>
      <Footer id="bottom">{props.footerContent}</Footer>
    </>
  );
};

Page.defaultProps = {
  backHref: null,
  breadcrumbs: [],
  feedbackHref: null,
  footerContent: null,
  logoHref: 'https://www.gov.uk/',
  phase: null,
  phaseBannerContent: null,
  navigation: [],
  sidePanels: [],
  signOutHref: null,
  signOutText: 'Sign out',
  title: null,
  titleHref: '/'
};

export default Page;
