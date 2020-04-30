import * as React from 'react';
import { Site } from '@not-govuk/components';

if (process.env.WEBPACK) require('./app.scss');

export interface IAppProps {
  title: string
};

export const App: React.FC<IAppProps> = (props: IAppProps) => (
  <Site
    title={props.title}
  >
    Hello world!2
  </Site>
);

export default App;
