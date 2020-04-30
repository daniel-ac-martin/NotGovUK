import * as React from 'react';
import { className } from '../../helpers';

const Hint: React.SFC<any> = props => (
  <span id={props.id} className={className('govuk-hint', props.className)}>{props.children}</span>
);

export default Hint;
