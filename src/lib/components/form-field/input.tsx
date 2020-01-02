import * as React from 'react';
import FormGroupWithLabel from './form-group-with-label';

const Input: React.SFC<any> = props => {
  const fieldId = `${props.id}-input`;

  return (
    <FormGroupWithLabel
      id={props.id}
      className={props.className}
      fieldId={fieldId}
      label={props.label}
      hint={props.hint}
      error={props.error}
    >
      <input
        id={fieldId}
        name={props.name}
        type={props.type}
        aria-describedby={`${props.id}-hint`}
        defaultValue={props.defaultValue}
        disabled={props.disabled}
        spellCheck={props.spellCheck}
        autoComplete={props.autoComplete}
      />
    </FormGroupWithLabel>
  );
};

export default Input;
