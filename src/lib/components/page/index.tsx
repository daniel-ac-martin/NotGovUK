import * as React from 'react';
import { A, BackLink, Breadcrumbs, Footer, Header, PhaseBanner, SkipLink } from '../';
import Body from './body';
import Main from './main';
import { INavigationLink } from '../header';
import { IBreadcrumb } from '../breadcrumbs';
import { bem, className } from '../../helpers';

interface IPage {
  /** Location for the Back link */
  backHref?: string,
  /** List of links */
  breadcrumbs?: Array<IBreadcrumb>
  /** Extra CSS classes to be applied */
  className?: string,
  /** The department whose colours to use */
  department?: string,
  /** HRef for providing feedback on the service */
  feedbackHref?: string,
  /** Content for the footer */
  footerContent?: any,
  /** Whether to use elements reserved for *.service.gov.uk */
  govUk?: boolean,
  /** HTML id */
  id?: string,
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
  titleHref?: string,
  /** Whether to remove limits on width */
  wide?: boolean
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
    <div className={className(bem('nguk-page', props.govUk ? undefined: 'not-govuk', props.department), props.className)}>
      <SkipLink id="skip-link" href="#content" />
      <Header
        department={props.department}
        logoHref={props.logoHref}
        navigation={props.navigation}
        signOutHref={props.signOutHref}
        signOutText={props.signOutText}
        title={props.title}
        titleHref={props.titleHref}
        wide={props.wide}
      />
      <Body>
        <div className={bem('govuk-width-container', props.wide ? 'wide' : undefined)}>
          {props.phase ? phaseBanner : ''}
          {props.breadcrumbs.length ?
          breadcrumbs :
          props.backHref ? backLink : ''
          }
          <Main id="main-content" role="main">
            <div className="govuk-grid-row">
              <div className="govuk-grid-column-two-thirds">
                {props.children}
              </div>
              <div className="govuk-grid-column-one-third">
                {props.sidePanels.map((v, i) => (
                  <aside key={i}>
                    {v}
                  </aside>
                ))}
              </div>
            </div>
          </Main>
        </div>
      </Body>
      <Footer>{props.footerContent}</Footer>
    </div>
  );
};

Page.defaultProps = {
  backHref: null,
  breadcrumbs: [],
  className: null,
  department: null,
  feedbackHref: null,
  footerContent: null,
  logoHref: 'https://www.gov.uk/',
  govUk: true,
  id: null,
  phase: null,
  phaseBannerContent: null,
  navigation: [],
  sidePanels: [],
  signOutHref: null,
  signOutText: 'Sign out',
  title: null,
  titleHref: '/',
  wide: false
};

export default Page;
