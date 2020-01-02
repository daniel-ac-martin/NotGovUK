import * as React from 'react';
import FormGroup from './form-group';
import Hint from './hint';
import ErrorMessage from './error-message';

const FormGroupWithLabel: React.SFC<any> = props => (
  <FormGroup id={props.id} className={props.className}>
    <label htmlFor={props.fieldId}>{props.label}</label>
    {props.hint && <Hint id={`${props.id}-hint`}>{props.hint}</Hint>}
    {props.error && <ErrorMessage id={`${props.id}-error`}>{props.error}</ErrorMessage>}
    {props.children}
  </FormGroup>
);

export default FormGroupWithLabel;
