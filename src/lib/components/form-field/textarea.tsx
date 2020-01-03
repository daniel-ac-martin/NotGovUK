import * as React from 'react';
import FormGroupWithLabel from './form-group-with-label';

const Textarea: React.SFC<any> = props => {
  const fieldId = `${props.id}-textarea`;

  return (
    <FormGroupWithLabel
      id={props.id}
      className={props.className}
      fieldId={fieldId}
      label={props.label}
      hint={props.hint}
      error={props.error}
    >
      <textarea
        id={fieldId}
        name={props.name}
        aria-describedby={`${props.id}-hint`}
        defaultValue={props.defaultValue}
        disabled={props.disabled}
        style={props.fieldStyle}
        spellCheck={props.spellCheck}
        autoComplete={props.autoComplete}
        rows={props.rows}
      />
    </FormGroupWithLabel>
  );
};

export default Textarea;
