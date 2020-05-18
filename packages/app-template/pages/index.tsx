import React from 'react';
import { Page } from '@not-govuk/app-composer';

import {
  StartButton
} from '@not-govuk/components';

const Page: Page = props => (<>
  <h1>This is NOT GovUK!</h1>
  <p className="lead">Whilst this site might <em>look</em> like GovUK it is in fact <strong>NOT</strong> GovUK.</p>
  <StartButton href="/forms" />
</>);

export default Page;
export const title = 'Home';
