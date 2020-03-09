import * as React from 'react';
import FormGroup from './form-group';
import Hint from './hint';
import ErrorMessage from './error-message';
import { className } from '../../helpers';

const FormGroupWithFieldset: React.SFC<any> = props => {
  const hintId = props.hint && `${props.id}-hint`;

  return (
    <FormGroup id={props.id} className={props.className}>
      <fieldset
        aria-describedby={hintId}
        className="govuk-fieldset"
        role={props.role}
      >
          <legend className="govuk-fieldset__legend">{props.legend}</legend>
          {props.hint && <Hint id={hintId}>{props.hint}</Hint>}
          {props.error && <ErrorMessage id={`${props.id}-error`}>{props.error}</ErrorMessage>}
          {props.children}
      </fieldset>
    </FormGroup>
  );
};

export default FormGroupWithFieldset;
