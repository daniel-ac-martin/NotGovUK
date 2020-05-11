import * as React from 'react';
import { Site } from '@not-govuk/components';

if (process.env.WEBPACK) require('./app.scss');

export const App: React.ComponentType<any> = Site;

export default App;
