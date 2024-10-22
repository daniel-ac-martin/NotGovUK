import { GraphQLSchema } from 'graphql';
import { ApolloClient, ApolloProvider, InMemoryCache, NormalizedCacheObject, createHttpLink } from '@apollo/client';
import { SchemaLink } from '@apollo/client/link/schema';
import { ComponentType, FC, Fragment, ReactNode, Suspense, createElement as h, lazy } from 'react';
import { Helmet, HelmetProvider, HelmetServerState } from 'react-helmet-async';
import { ScrollRestoration, RouteObject, Outlet } from 'react-router-dom';
import { useIsMounted, useLocation } from '@not-govuk/route-utils';
import { UserInfo, UserInfoContext } from '@not-govuk/user-info';

type DataCache = Record<string, any>;

export type HydrationData = {
  cache?: DataCache
  err?: ServerError
  pages: PageInfoCSR[]
  props: ApplicationProps
  signInHRef?: string
  signOutHRef?: string
  user?: UserInfo
};

export type Hydration = {
  id: string
  data?: HydrationData
};

export type RouteInfo = {
  href: string
  title: string
};

export type PageInfoCSR = RouteInfo & {
  src: string
};

type SSRComponent = Page | string;
type CSRComponent = Promise<SSRComponent>;

export type PageInfoSSR = PageInfoCSR & {
  Component: SSRComponent;
};

export type PageInfo = RouteInfo & {
  Component: SSRComponent | CSRComponent;
};

export type ApplicationProps = {
  children?: ReactNode
  pageTitle: string
};

type ServerError = {
  statusCode: number
  title: string
  message: string
};

export type HelmetDataContext = {
  helmet: HelmetServerState
}

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
  err?: ServerError
  pages: PageInfo[]
  signInHRef?: string
  signOutHRef?: string
};

type ComposeOptionsSSR = ComposeOptionsCommon & {
  graphQL?: {
    schema: GraphQLSchema
  }
  user?: UserInfo & {
    accessToken?: string
  }
};

type ComposeOptionsCSR = ComposeOptionsCommon & {
  LoadingPage: Page
  graphQL?: {
    endpoint: string,
  }
  user?: UserInfo
};

export type ComposeOptions = ComposeOptionsCSR | ComposeOptionsSSR;

type ComposeResultCommon = {
  RouterWrap: Application
  routes: RouteObject[]
};
type ComposeResultSSR = ComposeResultCommon & {
  extractDataCache: () => NormalizedCacheObject | undefined
  helmetContext: HelmetDataContext
};

type Compose = {
  (options: ComposeOptionsCSR): ComposeResultCommon;
  (options: ComposeOptionsSSR): ComposeResultSSR;
};

type DataProviderProps = {
  children?: ReactNode
  client?: ApolloClient<any>
};

const htmlPage = (html: string): Page => {
  const HTMLPage = (_: unknown) => h('div', {
    dangerouslySetInnerHTML: { __html: html }
  });

  return HTMLPage;
};

export const stringToComponentMod = (v: any) => (
  typeof v === 'string'
    ? htmlPage(v)
    : v
);

export const compose: Compose = (options: ComposeOptions) => {
  const UserInfoProvider: ComponentType<{ children?: ReactNode }> = ({ children }) => (
    options.user
      ? h(UserInfoContext.Provider, {
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
            'schema' in options.graphQL
              ? new SchemaLink({
                schema: options.graphQL.schema,
                context: { auth: options.user }
              })
              : createHttpLink({ uri: options.graphQL.endpoint })
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

  const pages = options
    .pages
    .map(({ href, ...rest }) => ({
      ...rest,
      href: decodeURI(href)
    }));
  const routes: RouteInfo[] = pages.map(({ href, title }) => ({ href, title }));
  const withPageWrap = <T>(Component: ComponentType<T & PageProps>) => (componentProps: T) => {
    const fullProps = {
      routes,
      signInHRef: options.signInHRef,
      signOutHRef: options.signOutHRef,
      ...componentProps
    };

    return h(options.PageWrap, fullProps, [
      h(Component, { key: 0, ...fullProps }),
      h(ScrollRestoration, { key: 1 })
    ]);
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
  const LoadingPage = (
    'LoadingPage' in options
      ? withPageWrap(options.LoadingPage)
      : undefined
  );
  const Layout: FC<{}> = () => {
    const isMounted = useIsMounted(); // Must replicate the server on first render, but allow client to recover on subsequent navigation

    return (
      h(Suspense, { fallback: LoadingPage && h(LoadingPage) },
        options.err && !isMounted && options.err.statusCode !== 404 // We can handle 404's via the router
          ? h(PageError, {
            internal: String(options.err.statusCode).startsWith('5'),
            title: options.err.title,
            message: options.err.message
          })
          : h(Outlet)
      )
    );
  };
  const routeObjects: RouteObject[] = [{
    element: h(Layout, {}),
    children: [
      ...pages.map(({ Component, href }) => {
        const Page = (
          Component instanceof Promise
            ? lazy(() => Component.then(stringToComponentMod))
            : stringToComponentMod(Component)
        );

        return ({
          caseSensitive: true,
          element: h(withPageWrap(Page)),
          path: href
        });
      }),
      {
        element: h(NotFoundPage),
        path: '*'
      }
    ]
  }];

  const RouterWrap: FC<ApplicationProps> = ({ children, ...props }) => h(
    options.AppWrap, props,
    h(HelmetProvider, { context: helmetContext }, [
      h(Helmet, { key: 0, htmlAttributes: { lang: 'en' } }),
      h(DataProvider, { key: 1, client },
        h(UserInfoProvider, {},
          children
        )
      )
    ])
  );

  return {
    RouterWrap,
    extractDataCache,
    helmetContext: helmetContext as HelmetDataContext,
    routes: routeObjects
  };
};

export { renderToStringWithData } from '@apollo/client/react/ssr';
export type { UserInfo };
