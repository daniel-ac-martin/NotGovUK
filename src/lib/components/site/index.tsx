import * as React from 'react';
import { Page } from '../';
import { Route, Switch } from 'react-router-dom';

interface IFeedback {
  /** HRef */
  href: string,
  /** Page content */
  content: any,
};

interface IRoutes {
  /** HRef */
  href: string,
  /** Page content */
  content: any,
  /** Page title */
  title: string,
};

interface ISite {
  /** Feedback form */
  feedback?: IFeedback,
  /** Content for the footer */
  footerContent?: any,
  /** HRef for the Crown logo link */
  logoHref?: string,
  /** The phase the service is in */
  phase?: string
  /** Content for the phase-banner */
  phaseBannerContent?: any,
  /** Routes */
  routes?: Array<IRoutes>,
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

export const Site: React.SFC<ISite> = props => {
  const feedbackHref = props.feedback && (props.feedback.href || '/feedback');
  const SitePage: React.SFC<any> = p => (
    <Page
      feedbackHref={feedbackHref}
      footerContent={props.footerContent}
      logoHref={props.logoHref}
      navigation={props.routes.map(e => ({
        href: e.href,
        text: e.title
      }))}
      phase={props.phase}
      phaseBannerContent={props.phaseBannerContent}
      sidePanels={props.sidePanels}
      signOutHref={props.signOutHref}
      signOutText={props.signOutText}
      title={props.title}
      titleHref={props.titleHref}
    >
      {p.children}
    </Page>
  );
  console.log(props.routes);

  return (
    <Switch>
      {props.routes.map(e => (
        <Route path={e.href}>
          <SitePage>
            {e.content}
          </SitePage>
        </Route>
      ))}
      {props.feedback && (
        <Route path={feedbackHref}>
          <SitePage>
            {props.feedback.content}
          </SitePage>
        </Route>
      )}
      <Route path="/">
        <SitePage>
          {props.children}
        </SitePage>
      </Route>
    </Switch>
  );
};

Site.defaultProps = {
  footerContent: null,
  logoHref: 'https://www.gov.uk/',
  phase: null,
  phaseBannerContent: null,
  routes: [],
  sidePanels: [],
  signOutHref: null,
  signOutText: 'Sign out',
  title: null,
  titleHref: '/'
};

export default Site;
