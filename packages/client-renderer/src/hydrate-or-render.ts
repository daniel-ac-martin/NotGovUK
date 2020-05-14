import { ComponentType, Suspense, createElement as h } from 'react';
import { hydrate as originalHydrate, render as originalRender } from 'react-dom';
import { RouteComponentProps, withRouter } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { PageWrapProps, PageLoader, PageProps, withPages, ErrorPageProps, convertProps } from './with-pages';

export const hydrateOrRender = <A extends PageWrapProps, B extends PageProps>(PageWrap: ComponentType<A>, ErrorPage: ComponentType<ErrorPageProps>, LoadingPage: ComponentType<RouteComponentProps>, pageLoader: PageLoader) => {
  const Loading = props => (
    h(PageWrap, convertProps(props, pageLoader),
      h(withRouter(LoadingPage))
     )
  );

  const createApp = (App: ComponentType<B>, props: B) => (
    h(BrowserRouter, {},
      h(Suspense, { fallback: h(Loading, props) },
        h(App, props)
       )
     )
  );

  interface IWindowWithProps extends Window {
    hydrationProps?: B;
  };

  const windowWithProps: IWindowWithProps = window;
  const app = createApp(withPages(PageWrap, ErrorPage, pageLoader), windowWithProps.hydrationProps);
  const root = document.getElementById('root');

  let r;

  try {
    r = originalHydrate(app, root);
    console.info('Hydration complete.');
  } catch (e) {
    console.log(e);
    console.warn('Hydration failed. Attempting to re-render...');
    try {
      r = originalRender(app, root);
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

  return r;
};

export default hydrateOrRender;
