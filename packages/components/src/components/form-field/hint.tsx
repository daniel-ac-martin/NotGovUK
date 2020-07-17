import { FC, createElement as h } from 'react';
import { className } from '../../helpers';

const Hint: FC<any> = props => (
  <span id={props.id} className={className('govuk-hint', props.className)}>{props.children}</span>
);

export default Hint;
