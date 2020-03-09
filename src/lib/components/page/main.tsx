import * as React from 'react';
import { className } from '../../helpers';

const Main: React.SFC<any> = props => (
  <main {...props} className={className('govuk-main-wrapper', props.className)}>
    {props.children}
  </main>
);

export default Main;
