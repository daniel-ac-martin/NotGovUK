import { FC, createElement as h } from 'react';
import { className } from '../../helpers';

const FormGroup: FC<any> = props => (
  <div id={props.id} className={className('govuk-form-group', props.className)}>
    {props.children}
  </div>
);

export default FormGroup;
