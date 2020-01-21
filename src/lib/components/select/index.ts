import * as React from 'react';
import FormField from '../form-field';

interface IOption {
  disabled?: boolean,
  label: string,
  selected?: boolean,
  value: string
};

interface ISelect {
  /** Extra CSS classes to be applied */
  className?: string,
  /** Whether the field should be disabled */
  disabled?: boolean,
  /** Error message */
  error?: string,
  /** Hint */
  hint?: string,
  /** HTML id (If not specified then the name will be used) */
  id?: string,
  /** Label */
  label: any,
  /** HTML name */
  name: string,
  /** onBlur callback (for controlled fields) */
  onBlur?: (x: string) => any,
  /** onChange callback (for controlled fields) */
  onChange?: (x: string) => any,
  /** List of options to select from */
  options: Array<IOption>,
  /** Value for controlled fields */
  value?: string
};

export const Select: React.SFC<ISelect> = props =>
  React.createElement(FormField, {
    className: props.className,
    disabled: props.disabled,
    error: props.error,
    hint: props.hint,
    id: props.id,
    label: props.label,
    multiple: false,
    name: props.name,
    onBlur: props.onBlur,
    onChange: props.onChange,
    options: props.options.map(e => ({
      disabled: e.disabled,
      label: e.label,
      selected: e.selected,
      value: e.value,
    })),
    type: 'select',
    value: props.value
  });

Select.defaultProps = {
  className: null,
  disabled: false,
  error: null,
  hint: null,
  id: null,
  onBlur: null,
  onChange: null,
  value: null
};

export default Select;
