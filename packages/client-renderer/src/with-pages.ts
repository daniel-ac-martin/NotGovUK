import { ComponentType, SFC, createElement as h, lazy } from 'react';
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router';

type PageModule = {
  default: ComponentType<RouteComponentProps>
  title?: string
};

export type PageLoader = (
  (string) => Promise<PageModule>
) & {
  dir: string
};

export type RouteInfo = {
  href: string
  title: string
};

export type Page = RouteInfo & {
  src: string
};

export type PageWrapProps = any & {
  routes: RouteInfo[]
};

export type PageProps = any & {
  pages: Page[]
};

type ErrorPageInfo = {
  internal: boolean
  title: string
  message: string
};

export type ErrorPageProps = ErrorPageInfo & RouteComponentProps;

export const convertProps = <A extends PageProps, B extends PageWrapProps>(props: A, pageLoader: PageLoader): B => {
  const routes = props
    .pages
    .map(e => ({
      Component: e.Component || lazy(() => pageLoader(e.src)),
      href: e.href,
      title: e.title
    }));
  const pageWrapProps = {
    ...(props as any),
    routes: routes
      .map(e => ({
        href: e.href,
        title: e.title
      }))
  };

  delete pageWrapProps.pages;
  delete pageWrapProps.err;

  return pageWrapProps;
};

export const withPages = <A extends PageWrapProps, B extends PageProps>(Component: ComponentType<A>, ErrorPage: ComponentType<ErrorPageProps>, pageLoader: PageLoader): ComponentType<B> => (props: B) => {
  const routes = props
    .pages
    .map(e => ({
      Component: e.Component || lazy(() => pageLoader(e.src)),
      href: e.href,
      title: e.title
    }));
  const pageWrapProps = convertProps(props, pageLoader);

  const withPageWrap = (Page: ComponentType<RouteComponentProps>) => (props: RouteComponentProps) => h(
    Component,
    pageWrapProps,
    h(Page, props)
  );
  const NotFoundErrorPage: SFC<RouteComponentProps> = (props: RouteComponentProps) => h(
    ErrorPage,
    {
      ...props,
      internal: false,
      title: 'Page not found',
      message: `${props.location.pathname} does not exist.`
    }
  );
  const ServerErrorPage: ComponentType<ErrorPageInfo> = withRouter(ErrorPage);

  return (
    props.err
      ? h(
        ServerErrorPage,
        {
          internal: String(props.err.statusCode).startsWith('5'),
          title: props.err.title,
          message: props.err.message
        }
      )
    : h(
    Switch,
    {},
    [
      ...routes.map((v, i) => h(
        Route,
        {
          component: withPageWrap(v.Component),
          exact: true,
          key: i,
          path: v.href
        }
      )),
      h(Route, {
        component: withPageWrap(NotFoundErrorPage),
        key: 'catch-all'
      })
    ]
    )
  );
};

export default withPages;
