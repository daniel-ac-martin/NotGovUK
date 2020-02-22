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
        aria-describedby={props.hint && `${props.id}-hint`}
        defaultValue={props.defaultValue}
        disabled={props.disabled}
        style={props.fieldStyle}
        spellCheck={props.spellCheck}
        autoComplete={props.autoComplete}
        onBlur={props.onBlur}
        onChange={props.onChange}
        value={props.value}
      />
    </FormGroupWithLabel>
  );
};

export default Input;
