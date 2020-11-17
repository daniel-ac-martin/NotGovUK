import { GraphQLSchema } from 'graphql';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { SchemaLink } from '@apollo/client/link/schema';
import { ComponentType, Fragment, Suspense, createElement as h, lazy } from 'react';
import { StaticRouter, StaticRouterProps, Switch } from 'react-router';
import { BrowserRouter, BrowserRouterProps } from 'react-router-dom';
import { Route, RouteComponentProps, withRouter } from '@not-govuk/route-utils';
import { UserInfo, UserInfoContext } from '@not-govuk/user-info';

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
  signInHRef?: string
  signOutHRef?: string
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
type ApplicationSSR = ComponentType<ApplicationPropsSSR> & {
  extractDataCache: () => object
};
export type Application = ComponentType<ApplicationProps>;

export type PageProps = RouteComponentProps & {
  routes: RouteInfo[]
  signInHRef?: string
  signOutHRef?: string
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
  data: object
  user?: UserInfo
};

type ComposeOptionsSSR = ComposeOptionsCommon & {
  graphQL?: {
    schema: GraphQLSchema
  }
  routerProps: StaticRouterProps
};

type ComposeOptionsCSR = ComposeOptionsCommon & {
  LoadingPage: Page
  graphQL?: {
    endpoint: string,
  }
  pageLoader: PageLoader
  routerProps: BrowserRouterProps
};

export type ComposeOptions = ComposeOptionsCSR | ComposeOptionsSSR;

type Compose = {
  (options: ComposeOptionsCSR): ApplicationCSR;
  (options: ComposeOptionsSSR): ApplicationSSR;
};

type DataProviderProps = {
  client?: ApolloClient<any>
};

export const compose: Compose = options => {
  const Router = (
    "context" in options.routerProps
      ? StaticRouter
      : BrowserRouter
  );
  const UserInfoProvider: ComponentType<{}> = ({ children }) => (
    options.user
      ? h(
        UserInfoContext.Provider,
        {
          value: options.user
        },
        children)
      : h(Fragment, {}, children)
  );
  const SuspenseOrFragment = (
    "LoadingPage" in options
      ? Suspense
      : Fragment
  );
  const client = (
    options.graphQL
      ? (
        new ApolloClient({
          cache: new InMemoryCache().restore(options.data),
          link: (
            options.graphQL.schema
              ? new SchemaLink({
                schema: options.graphQL.schema,
                context: { auth: options.user }
              })
              : createHttpLink(options.graphQL.endpoint)
          )
        })
      )
      : undefined
  );
  const DataProvider: ComponentType<DataProviderProps> = ({ children, client = undefined }) => (
    client
      ? h(ApolloProvider, {
        client,
        children
      })
      : h(Fragment, {}, children)
  );
  const extractDataCache = () => client && client.extract();

  const App = props => {
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
    const pageProps = {
      routes,
      signInHRef: props.signInHRef,
      signOutHRef: props.signOutHRef
    };
    const withPageWrap = Component => props => (
      h(
        options.PageWrap, pageProps,
        h(Component, props)
      )
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

    const router = h(
      Router, options.routerProps,
      h(UserInfoProvider, {}, h(
        SuspenseOrFragment, suspenseProps,
        switchOrError
      ))
    );

    return h(
      options.AppWrap, props,
      h(DataProvider, { client }, router)
    );
  };

  return Object.assign(App, { extractDataCache });
};

export { renderToStringWithData } from '@apollo/client/react/ssr';
export type { UserInfo };
