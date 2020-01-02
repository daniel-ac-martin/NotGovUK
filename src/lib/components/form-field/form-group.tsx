import * as React from 'react';
import { className } from '../../helpers';

const FormGroup: React.SFC<any> = props => (
  <div id={props.id} className={className('form-group', props.className)}>
    {props.children}
  </div>
);

export default FormGroup;
