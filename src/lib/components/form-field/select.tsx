import * as React from 'react';
import FormGroupWithLabel from './form-group-with-label';

const Select: React.SFC<any> = props => {
  const fieldId = `${props.id}-select`;

  return (
    <FormGroupWithLabel
      id={props.id}
      className={props.className}
      fieldId={fieldId}
      label={props.label}
      hint={props.hint}
      error={props.error}
    >
      <select
        id={fieldId}
        name={props.name}
        aria-describedby={props.hint && `${props.id}-hint`}
        disabled={props.disabled}
        multiple={props.multiple}
        size={props.rows}
        style={props.fieldStyle}
      >
        {props.options.map((v, i) => (
          <option key={i} value={v.value} selected={v.selected} disabled={v.disabled}>{v.label}</option>
        ))}
      </select>
    </FormGroupWithLabel>
  );
};

export default Select;
