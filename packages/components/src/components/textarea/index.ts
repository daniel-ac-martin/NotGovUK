import * as React from 'react';
import FormField from '../form-field';

interface ITextarea {
  /** Identifier for auto-completion */
  autoComplete?: string,
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
  /** Label */
  label: any,
  /** HTML name */
  name: string,
  /** onBlur callback (for controlled fields) */
  onBlur?: (x: string) => any,
  /** onChange callback (for controlled fields) */
  onChange?: (x: string) => any,
  /** Initial number of lines of input */
  rows?: number,
  /** Whether the browser should spellcheck the input */
  spellCheck?: boolean,
  /** Value for controlled fields */
  value?: string
};

export const Textarea: React.SFC<ITextarea> = props =>
  React.createElement(FormField, {
    autoComplete: props.autoComplete,
    className: props.className,
    defaultValue: props.defaultValue,
    disabled: props.disabled,
    error: props.error,
    hint: props.hint,
    id: props.id,
    label: props.label,
    name: props.name,
    onBlur: props.onBlur,
    onChange: props.onChange,
    rows: props.rows,
    spellCheck: props.spellCheck,
    type: 'textarea',
    value: props.value
  });

Textarea.defaultProps = {
  autoComplete: null,
  className: null,
  defaultValue: undefined,
  disabled: false,
  error: null,
  hint: null,
  id: null,
  onBlur: null,
  onChange: null,
  rows: null,
  spellCheck: null,
  value: undefined
};

export default Textarea;
