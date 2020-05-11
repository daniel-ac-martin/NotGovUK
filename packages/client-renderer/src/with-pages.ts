import { ComponentType, createElement as h, lazy } from 'react';
import { RouteComponentProps } from 'react-router';

type PageModule = {
  default: ComponentType<RouteComponentProps>
  title?: string
};

export type PageLoader = (
  (string) => Promise<PageModule>
) & {
  dir: string
};

type RouteMeta = {
  href: string
  title: string
};

export type Page = RouteMeta & {
  src: string
};

export type Route = RouteMeta & {
  Component: ComponentType<RouteComponentProps>
};

export type AppProps = any & {
  routes: Route[]
};

export type PageProps = any & {
  pages: Page[]
};

export const withPages = <A extends AppProps, B extends PageProps>(Component: ComponentType<A>, pageLoader: PageLoader): ComponentType<B> => (props: B) => {
  const routes = props
    .pages
    .map(e => ({
      Component: e.Component || lazy(() => pageLoader(e.src)),
      href: e.href,
      title: e.title
    }));
  const appProps: A = {
    ...(props as any),
    routes
  };

  delete appProps.pages;

  return h(Component, appProps);
};

export default withPages;
