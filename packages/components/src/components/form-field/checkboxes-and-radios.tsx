import { FC, createElement as h } from 'react';
import FormGroupWithFieldset from './form-group-with-fieldset';
import { className } from '../../helpers';

const CheckboxesAndRadios: FC<any> = props => (
  <FormGroupWithFieldset
    id={props.id}
    className={props.className}
    legend={props.label}
    hint={props.hint}
    error={props.error}
  >
    {props.children}
  </FormGroupWithFieldset>
);

export default CheckboxesAndRadios;
