import { ComponentType, Fragment, Suspense, createElement as h, lazy } from 'react';
import { StaticRouter, StaticRouterProps, Switch } from 'react-router';
import { BrowserRouter, BrowserRouterProps } from 'react-router-dom';
import { Route, RouteComponentProps, withRouter } from '@not-govuk/route-utils';

export type RouteInfo = {
  href: string
  title: string
};

export type PageInfo = RouteInfo & {
  src: string
};

export type PageInfoSSR = PageInfo & {
  Component: Page
};

type ApplicationPropsCommon = {
  err?: ServerError
  pageTitle: string
};

export type ApplicationPropsCSR = ApplicationPropsCommon & {
  pages: PageInfo[]
};

type ServerError = {
  statusCode: number
  title: string
  message: string
};

export type ApplicationPropsSSR = ApplicationPropsCommon & {
  pages: PageInfoSSR[]
};

export type ApplicationProps = ApplicationPropsCSR | ApplicationPropsSSR;

type ApplicationCSR = ComponentType<ApplicationPropsCSR>;
type ApplicationSSR = ComponentType<ApplicationPropsSSR>;
export type Application = ComponentType<ApplicationProps>;

export type PageProps = RouteComponentProps & {
  routes: RouteInfo[]
};

export type Page = ComponentType<PageProps>;

export type ErrorPageProps = PageProps & {
  internal: boolean
  title: string
  message: string
};

export type ErrorPage = ComponentType<ErrorPageProps>;

type PageModule = {
  default: Page
  title?: string
};

export type PageLoader = (
  (string) => Promise<PageModule>
) & {
  dir: string
};

type ComposeOptionsCommon = {
  AppWrap: Application
  ErrorPage: ErrorPage
  PageWrap: Page
};

type ComposeOptionsSSR = ComposeOptionsCommon & {
  routerProps: StaticRouterProps
};

type ComposeOptionsCSR = ComposeOptionsCommon & {
  LoadingPage: Page
  pageLoader: PageLoader
  routerProps: BrowserRouterProps
};

export type ComposeOptions = ComposeOptionsCSR | ComposeOptionsSSR;

type Compose = {
  (options: ComposeOptionsCSR): ApplicationCSR;
  (options: ComposeOptionsSSR): ApplicationSSR;
};

export const compose: Compose = options => props => {
  const Router = (
    "context" in options.routerProps
      ? StaticRouter
      : BrowserRouter
  );
  const routes = props
    .pages
    .map(e => ({
      Component: (
        "pageLoader" in options
          ? lazy(() => options.pageLoader(e.src))
          : e.Component
      ),
      href: decodeURI(e.href),
      title: e.title
    }));
  const pageProps = { routes };
  const withPageWrap = Component => props => (
    h(
      options.PageWrap, pageProps,
      h(Component, props)
    )
  );
  const SuspenseOrFragment = (
    "LoadingPage" in options
      ? Suspense
      : Fragment
  );
  const suspenseProps = (
    "LoadingPage" in options
      ? { fallback: h(withRouter(withPageWrap(options.LoadingPage))) }
      : undefined
  );
  const PageError = withPageWrap(options.ErrorPage);

  const switchOrError = (
    props.err
      ? h(
        withRouter(PageError),
        {
          internal: String(props.err.statusCode).startsWith('5'),
          title: props.err.title,
          message: props.err.message
        })
      : h(
        Switch, {},
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
            component: props => h(
              PageError,
              {
                ...props,
                internal: false,
                title: 'Page not found',
                message: `${props.location.pathname} does not exist.`
              }
            ),
            key: 'catch-all'
          })
        ]
      )
  );

  return h(
    options.AppWrap, props,
    h(Router, options.routerProps,
      h(
        SuspenseOrFragment, suspenseProps,
        switchOrError
      )
     )
  );
};
