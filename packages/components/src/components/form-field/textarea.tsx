import * as React from 'react';
import FormGroupWithLabel from './form-group-with-label';
import { bem } from '../../helpers';

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
        className={bem('govuk-textarea', props.error && 'error')}
        name={props.name}
        aria-describedby={props.hint && `${props.id}-hint`}
        defaultValue={props.defaultValue}
        disabled={props.disabled}
        style={props.fieldStyle}
        spellCheck={props.spellCheck}
        autoComplete={props.autoComplete}
        rows={props.rows}
        onBlur={props.onBlur}
        onChange={props.onChange}
        value={props.value}
      />
    </FormGroupWithLabel>
  );
};

export default Textarea;
