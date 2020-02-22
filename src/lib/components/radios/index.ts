import * as React from 'react';
import FormField from '../form-field';

interface IOption {
  disabled?: boolean,
  hint?: string,
  label: string,
  value: string
};

interface IRadios {
  /** Extra CSS classes to be applied */
  className?: string,
  /** Initial value of the field */
  defaultValue?: string,
  /** Whether the field should be disabled */
  disabled?: boolean,
  /** Error message */
  error?: string,
  /** Hint */
  hint?: string,
  /** HTML id (If not specified then the name will be used) */
  id?: string,
  /** Whether the radios should be displayed on a single line on wide displays */
  inline?: boolean,
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
  /** Whether the radios should be small */
  small?: boolean,
  /** Value for controlled fields */
  value?: string
};

export const Radios: React.SFC<IRadios> = props =>
  React.createElement(FormField, {
    className: props.className,
    defaultValue: props.defaultValue,
    disabled: props.disabled,
    error: props.error,
    hint: props.hint,
    id: props.id,
    inline: props.inline || false,
    label: props.label,
    multiple: false,
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
    type: 'radios',
    value: props.value
  });

Radios.defaultProps = {
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

export default Radios;
