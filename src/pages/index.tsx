import * as React from 'react';

import {
  StartButton
} from '../lib';

export const index = (<>
  <h1>This is NOT GovUK!</h1>
  <p className="lead">Whilst this site might <em>look</em> like GovUK it is in fact <strong>NOT</strong> GovUK.</p>
  <StartButton href="/poc" />
</>);

export default index;
export { default as forms } from './forms';
export { default as poc } from './poc';
