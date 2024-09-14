import { GraphQLSchema } from 'graphql';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { SchemaLink } from '@apollo/client/link/schema';
import { ComponentType, FC, Fragment, ReactNode, Suspense, createElement as h, lazy } from 'react';
import { Helmet, HelmetProvider, HelmetServerState } from 'react-helmet-async';
import { BrowserRouter, BrowserRouterProps, Routes } from 'react-router-dom';
import { StaticRouter, StaticRouterProps } from 'react-router-dom/server';
import { Route, useLocation } from '@not-govuk/route-utils';
import { UserInfo, UserInfoContext } from '@not-govuk/user-info';

type DataCache = object;

export type HydrationData = {
  props: ApplicationPropsCSR
  cache?: DataCache
  user?: UserInfo
};

export type Hydration = {
  id: string
  data: HydrationData
};

export type RouteInfo = {
  href: string
  title: string
};

export type PageInfo = RouteInfo & {
  src: string
};

type SSRComponent = Page | string;

export type PageInfoSSR = PageInfo & {
  Component: SSRComponent
};

type ApplicationPropsCommon = {
  children?: ReactNode
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

export type HelmetDataContext = {
  helmet: HelmetServerState
}

export type ApplicationPropsSSR = ApplicationPropsCommon & {
  pages: PageInfoSSR[]
};

export type ApplicationProps = ApplicationPropsCSR | ApplicationPropsSSR;

type ApplicationCSR = ComponentType<ApplicationPropsCSR>;
type ApplicationSSR = ComponentType<ApplicationPropsSSR> & {
  extractDataCache: () => object
  helmetContext: HelmetDataContext
};
export type Application = ComponentType<ApplicationProps>;

export type PageProps = {
  children?: ReactNode
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

export type PageModule = {
  default: Page | string
  title?: string
};

export type PageLoader = __WebpackModuleApi.RequireContext;

type ComposeOptionsCommon = {
  AppWrap: Application
  ErrorPage: ErrorPage
  PageWrap: Page
  data?: DataCache
};

type ComposeOptionsSSR = ComposeOptionsCommon & {
  graphQL?: {
    schema: GraphQLSchema
  }
  routerProps: StaticRouterProps
  user?: UserInfo & {
    accessToken?: string
  }
};

type ComposeOptionsCSR = ComposeOptionsCommon & {
  LoadingPage: Page
  graphQL?: {
    endpoint: string,
  }
  pageLoader: PageLoader
  routerProps: BrowserRouterProps
  user?: UserInfo
};

export type ComposeOptions = ComposeOptionsCSR | ComposeOptionsSSR;

type Compose = {
  (options: ComposeOptionsCSR): ApplicationCSR;
  (options: ComposeOptionsSSR): ApplicationSSR;
};

type DataProviderProps = {
  children?: ReactNode
  client?: ApolloClient<any>
};

const htmlPage = (html: string): Page => {
  const HTMLPage = (_) => h(
    'div',
    {
      dangerouslySetInnerHTML: { __html: html }
    }
  );

  return HTMLPage;
};

const stringToComponentMod = v => (
  typeof v.default === 'string'
  ? {
    default: htmlPage(v.default)
  }
    : v
);

export const compose: Compose = options => {
  const Router = (
    "context" in options.routerProps
      ? StaticRouter
      : BrowserRouter
  );
  const UserInfoProvider: ComponentType<{ children?: ReactNode }> = ({ children }) => (
    options.user
      ? h(
        UserInfoContext.Provider,
        {
          value: options.user
        },
        children)
      : h(Fragment, {}, children)
  );
  const client = (
    options.graphQL
      ? (
        new ApolloClient({
          cache: (
            options.data
              ? new InMemoryCache().restore(options.data)
              : new InMemoryCache()
          ),
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
  const helmetContext = {};

  const App = props => {
    const routes = props
      .pages
      .map(e => {
        const loaded = (
          e.Component
            ? { default: e.Component }
            : options.pageLoader(e.src)
        );
        const loadedComponentMod = (
          loaded instanceof Promise
            ? loaded.then(stringToComponentMod)
            : stringToComponentMod(loaded)
        );
        const Component = (
          loadedComponentMod instanceof Promise
            ? lazy(() => loadedComponentMod)
            : loadedComponentMod.default
        );

        return {
          Component,
          href: decodeURI(e.href),
          title: e.title
        };
      });
    const withPageWrap = Component => componentProps => {
      const fullProps = {
        routes,
        signInHRef: props.signInHRef,
        signOutHRef: props.signOutHRef,
        ...componentProps
      };

      return h(
        options.PageWrap, fullProps,
        h(Component, fullProps)
      );
    };
    const PageError = withPageWrap(options.ErrorPage);
    const NotFoundPage: FC<{}> = () => {
      const location = useLocation();

      return h(PageError, {
        internal: false,
        title: 'Page not found',
        message: `${location.pathname} does not exist.`
      });
    };

    const switchOrError = (
      props.err
        ? h(
          PageError,
          {
            internal: String(props.err.statusCode).startsWith('5'),
            title: props.err.title,
            message: props.err.message
          })
        : h(
          Routes, {},
          [
              ...routes.map((v, i) => h(
                Route,
                {
                  caseSensitive: true,
                  element: h(withPageWrap(v.Component)),
                  key: i,
                  path: v.href
                }
              )),
              h(Route, {
                element: h(NotFoundPage),
                key: 'catch-all',
                path: '*'
              })
          ]
        )
    );

    const router = h(
      Router, options.routerProps,
      h(UserInfoProvider, {}, switchOrError /* (
        "LoadingPage" in options
        ? h(
          Suspense, { fallback: h(withPageWrap(options.LoadingPage)) },
          switchOrError
        )
        : h(
          Fragment, {},
          switchOrError
        )
      ) */ )
    );

    return h(
      options.AppWrap, props,
      h(
        HelmetProvider, { context: helmetContext },
        [
          h(Helmet, { key: 0, htmlAttributes: { lang: 'en' }}),
          h(DataProvider, { key: 1, client }, router)
        ]
      )
    );
  };

  return Object.assign(App, {
    extractDataCache,
    helmetContext: helmetContext as HelmetDataContext
  });
};

export { renderToStringWithData } from '@apollo/client/react/ssr';
export type { UserInfo };
