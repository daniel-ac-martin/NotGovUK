import { ComponentType, createElement as h } from 'react';
import { flushSync } from 'react-dom';
import { hydrateRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router';
import { ApplicationProps, ErrorPageProps, Hydration, PageLoader, PageProps, compose } from '@not-govuk/app-composer';

export type HydrateOrRenderOptions = {
  AppWrap: ComponentType<ApplicationProps>
  ErrorPage: ComponentType<ErrorPageProps>
  LoadingPage: ComponentType<PageProps>
  PageWrap: ComponentType<PageProps>
  basename?: string
  graphQL?: string
  pageLoader: PageLoader
};

export type HydrateOrRender = (options: HydrateOrRenderOptions) => void;

export const hydrateOrRender: HydrateOrRender = ({
  AppWrap,
  ErrorPage,
  LoadingPage,
  PageWrap,
  basename = '/',
  graphQL = '/graphql',
  pageLoader
}) => {
  interface IWindowWithHydration extends Window {
    hydration?: Hydration
  };

  const windowWithProps: IWindowWithHydration = window;
  const rootId: string = windowWithProps.hydration?.id || '';
  const appProps = windowWithProps.hydration?.data?.props;
  const err = windowWithProps.hydration?.data?.err;
  const data = windowWithProps.hydration?.data?.cache;
  const user = windowWithProps.hydration?.data?.user;
  const signInHRef = windowWithProps.hydration?.data?.signInHRef;
  const signOutHRef = windowWithProps.hydration?.data?.signOutHRef;
  const pages = (windowWithProps.hydration?.data?.pages || []).map(
    ({ src, ...rest }) => ({
      ...rest,
      Component: pageLoader(src).default
    })
  );

  const { RouterWrap, routes } = compose({
    AppWrap,
    ErrorPage,
    LoadingPage,
    PageWrap,
    err,
    data,
    graphQL: {
      endpoint: graphQL
    },
    pages,
    signInHRef,
    signOutHRef,
    user
  });
  const router = createBrowserRouter(routes, {
    basename,
    future: {
      v7_relativeSplatPath: true
    }
  });
  const app = (
      h(RouterWrap, appProps,
        h(RouterProvider, {
          router,
          flushSync: flushSync as any,
          //fallbackElement: h(LoadingPage, { ...appProps, routes: [] })
        }))
  );
  const container = document.getElementById(rootId);
  const root = container && hydrateRoot(container, app);

  const jsEnabledClass = 'js-enabled';

  document.body.className = (
    document.body.className
      ? `${document.body.className} ${jsEnabledClass}`
      : jsEnabledClass
  );
};

export default hydrateOrRender;
