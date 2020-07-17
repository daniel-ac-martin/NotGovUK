import { FC, createElement as h } from 'react';
import FormGroupWithLabel from './form-group-with-label';
import { bem } from '../../helpers';

const Select: FC<any> = props => {
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
        className={bem('govuk-select', props.error && 'error')}
        name={props.name}
        aria-describedby={props.hint && `${props.id}-hint`}
        defaultValue={props.defaultValue}
        disabled={props.disabled}
        multiple={props.multiple}
        size={props.rows}
        style={props.fieldStyle}
        onBlur={props.onBlur}
        onChange={props.onChange}
        value={props.value}
      >
        {props.options.map((v, i) => (
          <option key={i} value={v.value} disabled={v.disabled}>{v.label}</option>
        ))}
      </select>
    </FormGroupWithLabel>
  );
};

export default Select;
