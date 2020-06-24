import { FC, Fragment, createElement as h } from 'react';
import { Page } from '../';
import { Route, Switch } from 'react-router-dom';
import { bem, className } from '../../helpers';
import { RouteComponentProps } from 'react-router';

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
  content?: any,
  /** Page component */
  Component: React.ComponentType<RouteComponentProps>,
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

interface PageErrorProps {
  internal?: boolean
  title: string
  message: string
};

const PageError: FC<PageErrorProps> = p => (
  <Fragment>
  { p.internal ? (
    <Fragment>
    <h1>Something went wrong...</h1>
    <h2>{p.title}</h2>
    </Fragment>
  ) : (
    <h1 className="govuk-heading-l">{p.title}</h1>
  )}
  <p>{p.message}</p>
  </Fragment>
);

export const Site: FC<ISite> = props => {
  const feedbackHref = props.feedback && (props.feedback.href || '/feedback');
  const SitePage: FC<any> = p => (
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
      signOutHref={props.signOutHref}
      signOutText={props.signOutText}
      title={props.title}
      titleHref={props.titleHref}
      wide={props.wide}
    >
      {p.children}
    </Page>
  );
  const withPage = <T extends unknown>(Component: React.ComponentType<T>) => (props: T) => (
    <SitePage>
      <Component {...props} />
    </SitePage>
  );
  const NotFoundErrorPage: FC<RouteComponentProps> = withPage(({ location }) => (
    <PageError
      title="Page not found"
      message={`${location.pathname} does not exist.`}
    />
  ));

  return (
    <div className={className(bem('nguk-site', props.govUk ? undefined: 'not-govuk'), props.className)}>
      <Switch>
        {props.routes.map((v, i) => (
          <Route exact path={v.href} key={i} component={withPage(v.Component)} />
        ))}
        {props.feedback && (
          <Route exact path={feedbackHref}>
            <SitePage>
              {props.feedback.content}
            </SitePage>
          </Route>
        )}
        <Route component={NotFoundErrorPage} />
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
  signOutHref: null,
  signOutText: 'Sign out',
  title: null,
  titleHref: '/',
  wide: false
};

export default Site;
