import * as React from 'react';
import FormField, { SelectValue } from '../form-field';

export interface IOption {
  disabled?: boolean,
  hint?: string,
  label: string,
  value: string
};

export interface ICheckboxes {
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
  /** Whether the checkboxes should be displayed on a single line on wide displays */
  inline?: boolean,
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
  /** Whether the checkboxes should be small */
  small?: boolean,
  /** Value for controlled fields */
  value?: SelectValue
};

export const Checkboxes: React.SFC<ICheckboxes> = props =>
  React.createElement(FormField, {
    className: props.className,
    defaultValue: props.defaultValue,
    disabled: props.disabled,
    error: props.error,
    hint: props.hint,
    id: props.id,
    inline: props.inline || false,
    label: props.label,
    multiple: true,
    name: props.name,
    onBlur: props.onBlur,
    onChange: props.onChange,
    options: props.options.map(e => ({
      disabled: e.disabled,
      hint: e.hint,
      label: e.label,
      value: e.value
    })),
    small: props.small || false,
    type: 'checkboxes',
    value: props.value
  });

Checkboxes.defaultProps = {
  className: null,
  defaultValue: undefined,
  disabled: false,
  error: null,
  hint: null,
  id: null,
  inline: null,
  onBlur: null,
  onChange: null,
  small: null,
  value: undefined
};

export default Checkboxes;
