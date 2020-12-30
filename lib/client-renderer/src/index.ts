import { ComponentType, createElement as h } from 'react';
import { hydrate as originalHydrate, render as originalRender } from 'react-dom';
import { ApplicationProps, ErrorPageProps, Hydration, PageProps, PageLoader, compose } from '@not-govuk/app-composer';

export type HydrateOrRenderOptions = {
  AppWrap: ComponentType<ApplicationProps>
  ErrorPage: ComponentType<ErrorPageProps>
  LoadingPage: ComponentType<PageProps>
  PageWrap: ComponentType<PageProps>
  pageLoader: PageLoader
};

export type HydrateOrRender = (options: HydrateOrRenderOptions) => void;

export const hydrateOrRender: HydrateOrRender = ({
  AppWrap,
  ErrorPage,
  LoadingPage,
  PageWrap,
  pageLoader
}) => {
  interface IWindowWithHydration extends Window {
    hydration?: Hydration
  };

  const routerProps = {};
  const windowWithProps: IWindowWithHydration = window;
  const app = h(
    compose({
      AppWrap,
      ErrorPage,
      LoadingPage,
      PageWrap,
      data: windowWithProps.hydration.data.cache,
      graphQL: {
        endpoint: '/graphql'
      },
      pageLoader,
      routerProps,
      user: windowWithProps.hydration.data.user
    }),
    windowWithProps.hydration.data.props
  );
  const root = document.getElementById(windowWithProps.hydration.id);

  try {
    originalHydrate(app, root);
    console.info('Hydration complete.');
  } catch (e) {
    console.log(e);
    console.warn('Hydration failed. Attempting to re-render...');
    try {
      originalRender(app, root);
      console.info('Render complete.');
    } catch (e) {
      console.log(e);
      console.warn('Render failed. Falling back to SSR...');
    }
  }

  const jsEnabledClass = 'js-enabled';

  document.body.className = (
    document.body.className
      ? `${document.body.className} ${jsEnabledClass}`
      : jsEnabledClass
  );
};

export default hydrateOrRender;
