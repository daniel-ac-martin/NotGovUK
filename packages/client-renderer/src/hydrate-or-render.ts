import { ComponentType, Suspense, createElement as h } from 'react';
import { hydrate as originalHydrate, render as originalRender } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppProps, PageLoader, PageProps, withPages } from './with-pages';

export const hydrateOrRender = <A extends AppProps, B extends PageProps>(App: ComponentType<A>, pageLoader: PageLoader) => {
  const createApp = (App: ComponentType<B>, props: B) => (
    h(BrowserRouter, {},
      h(Suspense, { fallback: h('div', {}, 'Loading...') },
        h(App, props)
       )
     )
  );

  interface IWindowWithProps extends Window {
    hydrationProps?: B;
  };

  const windowWithProps: IWindowWithProps = window;
  const app = createApp(withPages(App, pageLoader), windowWithProps.hydrationProps);
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
