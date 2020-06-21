import { FC, createElement as h } from 'react';
import { className } from '../../helpers';

const Label: FC<any> = props => (
  <label htmlFor={props.htmlFor} className={className('govuk-label', props.className)}>{props.children}</label>
);

export default Label;
