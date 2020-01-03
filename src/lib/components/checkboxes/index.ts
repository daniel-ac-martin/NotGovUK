import * as React from 'react';
import FormField from '../form-field';

interface IOption {
  checked?: boolean,
  disabled?: boolean,
  hint?: string,
  label: string,
  value: string
};

interface ICheckboxes {
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
  /** Whether the checkboxes should be displayed on a single line on wide displays */
  inline?: boolean,
  /** Label */
  label: any,
  /** HTML name */
  name: string,
  /** List of options to select from */
  options: Array<IOption>,
  /** Whether the checkboxes should be small */
  small?: boolean
};

export const Checkboxes: React.SFC<ICheckboxes> = props =>
  React.createElement(FormField, {
    className: props.className,
    disabled: props.disabled,
    error: props.error,
    hint: props.hint,
    id: props.id,
    inline: props.inline || false,
    label: props.label,
    multiple: true,
    name: props.name,
    options: props.options.map(e => ({
      disabled: e.disabled,
      hint: e.hint,
      label: e.label,
      selected: e.checked,
      value: e.value
    })),
    small: props.small || false,
    type: 'checkboxes'
  });

Checkboxes.defaultProps = {
  className: null,
  disabled: false,
  error: null,
  hint: null,
  id: null,
  inline: null,
  small: null
};

export default Checkboxes;
