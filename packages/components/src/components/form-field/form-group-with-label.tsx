import { FC, createElement as h } from 'react';
import FormGroup from './form-group';
import Hint from './hint';
import Label from './label';
import ErrorMessage from './error-message';

const FormGroupWithLabel: FC<any> = props => (
  <FormGroup id={props.id} className={props.className}>
    <Label htmlFor={props.fieldId}>{props.label}</Label>
    {props.hint && <Hint id={`${props.id}-hint`}>{props.hint}</Hint>}
    {props.error && <ErrorMessage id={`${props.id}-error`}>{props.error}</ErrorMessage>}
    {props.children}
  </FormGroup>
);

export default FormGroupWithLabel;
