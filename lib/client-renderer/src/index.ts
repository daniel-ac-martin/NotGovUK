import { ComponentType, createElement as h } from 'react';
import { hydrate as originalHydrate, render as originalRender } from 'react-dom';
import { ApplicationProps, ApplicationPropsCSR, ErrorPageProps, PageProps, PageLoader, UserInfo, compose } from '@not-govuk/app-composer';

export const hydrateOrRender = (AppWrap: ComponentType<ApplicationProps>, PageWrap: ComponentType<PageProps>, ErrorPage: ComponentType<ErrorPageProps>, LoadingPage: ComponentType<PageProps>, pageLoader: PageLoader): void => {
  interface IWindowWithHydration extends Window {
    hydrationData?: object
    hydrationUser?: UserInfo
    hydrationId?: string
    hydrationProps?: ApplicationPropsCSR
  };

  const routerProps = {};
  const windowWithProps: IWindowWithHydration = window;
  const app = h(
    compose({
      AppWrap,
      ErrorPage,
      LoadingPage,
      PageWrap,
      data: windowWithProps.hydrationData,
      graphQL: {
        endpoint: '/graphql'
      },
      pageLoader,
      routerProps,
      user: windowWithProps.hydrationUser
    }),
    windowWithProps.hydrationProps
  );
  const root = document.getElementById(windowWithProps.hydrationId);

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
