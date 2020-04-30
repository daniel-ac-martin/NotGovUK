import * as React from 'react';
import { className } from '../../helpers';

const Body: React.SFC<any> = props => (
  <div {...props} className={className('nguk-page__body', props.className)}>
    {props.children}
  </div>
);

export default Body;
