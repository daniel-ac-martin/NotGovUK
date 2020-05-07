import { ComponentType, Suspense, createElement as h } from 'react';
import { hydrate as originalHydrate, render as originalRender } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

export const hydrateOrRender = <A extends object>(App: ComponentType<A>) => {
  const createApp = (App: ComponentType<A>, props: A) => (
    h(BrowserRouter, {},
      h(Suspense, { fallback: h('div', {}, 'Loading...') },
        h(App, props)
       )
     )
  );

  interface IWindowWithProps extends Window {
    hydrationProps?: A;
  };

  const windowWithProps: IWindowWithProps = window;
  const root = document.getElementById('root');

  let r;

  try {
    r = originalHydrate(
      createApp(App, windowWithProps.hydrationProps),
      root
    );
    console.info('Hydration complete.');
  } catch (e) {
    console.log(e);
    console.warn('Hydration failed. Attempting to re-render...');
    try {
      r = originalRender(
        createApp(App, windowWithProps.hydrationProps),
        root
      );
      console.info('Render complete.');
    } catch (e) {
      console.log(e);
      console.warn('Render failed. Falling back to SSR...');
    }
  }

  return r;
};

export default hydrateOrRender;
