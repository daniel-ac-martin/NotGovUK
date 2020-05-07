import * as React from 'react';
import { Site } from '@not-govuk/components';

if (process.env.WEBPACK) require('./app.scss');

export const App: React.FC<any> = (props) => {
  const routes = props
    .pages
    .map(e => ({
      Component: e.Component || React.lazy(() => import('../../pages/' + e.src)),
      href: e.href,
      title: e.title
    }));

  return (
    <Site
      {...props}
      routes={routes}
    />
  )
};

export default App;
