import { ComponentType, createElement as h } from 'react';
import { hydrate as originalHydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

export const hydrate = <A extends object>(App: ComponentType<A>) => {
  const createApp = (App: ComponentType<A>, props: A) => (
    h(BrowserRouter, {},
      h(App, props)
     )
  );

  interface IWindowWithProps extends Window {
    hydrationProps?: A;
  };

  const windowWithProps: IWindowWithProps = window;

  return originalHydrate(
    createApp(App, windowWithProps.hydrationProps),
    document.getElementById('root')
  );
};

export default hydrate;
