import * as React from 'react';
import { className } from '../../helpers';

const Label: React.SFC<any> = props => (
  <label htmlFor={props.htmlFor} className={className('govuk-label', props.className)}>{props.children}</label>
);

export default Label;
