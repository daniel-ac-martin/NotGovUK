import * as React from 'react';
import { Page } from '../';
import { Route, Switch } from 'react-router-dom';
import { bem, className } from '../../helpers';

interface IFeedback {
  /** HRef */
  href?: string,
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
  /** Extra CSS classes to be applied */
  className?: string,
  /** The department whose colours to use */
  department?: string,
  /** Feedback form */
  feedback?: IFeedback,
  /** Content for the footer */
  footerContent?: any,
  /** Whether to use elements reserved for *.service.gov.uk */
  govUk?: boolean,
  /** HRef for the Crown logo link */
  logoHref?: string,
  /** HTML id */
  id?: string,
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
  titleHref?: string,
  /** Whether to remove limits on width */
  wide?: boolean
};

export const Site: React.SFC<ISite> = props => {
  const feedbackHref = props.feedback && (props.feedback.href || '/feedback');
  const SitePage: React.SFC<any> = p => (
    <Page
      department={props.department}
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
      wide={props.wide}
    >
      {p.children}
    </Page>
  );

  return (
    <div className={className(bem('nguk-site', props.govUk ? undefined: 'not-govuk'), props.className)}>
      <Switch>
        {props.routes.map((v, i) => (
          <Route path={v.href} key={i}>
            <SitePage>
              {v.content}
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
    </div>
  );
};

Site.defaultProps = {
  className: null,
  department: null,
  footerContent: null,
  govUk: true,
  logoHref: 'https://www.gov.uk/',
  id: null,
  phase: null,
  phaseBannerContent: null,
  routes: [],
  sidePanels: [],
  signOutHref: null,
  signOutText: 'Sign out',
  title: null,
  titleHref: '/',
  wide: false
};

export default Site;
