import * as React from 'react';
import FormField, { SelectValue } from '../form-field';

export interface IOption {
  disabled?: boolean,
  label: string,
  selected?: boolean,
  value: string
};

export interface ISelect {
  /** Extra CSS classes to be applied */
  className?: string,
  /** Initial value of the field */
  defaultValue?: SelectValue,
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
  onBlur?: (e: React.FocusEvent<any>) => void,
  /** onChange callback (for controlled fields) */
  onChange?: (e: React.ChangeEvent<any>) => void,
  /** List of options to select from */
  options: Array<IOption>,
  /** Value for controlled fields */
  value?: SelectValue
};

export const Select: React.SFC<ISelect> = props =>
  React.createElement(FormField, {
    className: props.className,
    defaultValue: props.defaultValue,
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
  defaultValue: undefined,
  disabled: false,
  error: null,
  hint: null,
  id: null,
  onBlur: null,
  onChange: null,
  value: undefined
};

export default Select;
