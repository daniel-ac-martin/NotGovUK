import * as React from 'react';

import {
  StartButton
} from '../lib';

export const Index = props => (<>
  <h1>This is NOT GovUK!</h1>
  <p className="lead">Whilst this site might <em>look</em> like GovUK it is in fact <strong>NOT</strong> GovUK.</p>
  <StartButton href="/forms" />
</>);

export default Index;
export { default as Forms } from './forms';
export { default as POC } from './poc';
export { default as Result } from './result';
