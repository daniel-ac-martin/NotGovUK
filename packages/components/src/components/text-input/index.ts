import * as React from 'react';
import FormField from '../form-field';

export interface ITextInput {
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
  onBlur?: (e: React.FocusEvent<any>) => void,
  /** onChange callback (for controlled fields) */
  onChange?: (e: React.ChangeEvent<any>) => void,
  /** Whether the browser should spellcheck the input */
  spellCheck?: boolean,
  /** Value for controlled fields */
  value?: string,
  /** Width of the field in characters (approximate) */
  width?: number
};

export const TextInput: React.SFC<ITextInput> = props =>
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
    spellCheck: props.spellCheck,
    type: 'text',
    value: props.value,
    width: props.width
  });

TextInput.defaultProps = {
  autoComplete: null,
  className: null,
  defaultValue: undefined,
  disabled: false,
  error: null,
  hint: null,
  id: null,
  onBlur: null,
  onChange: null,
  spellCheck: null,
  value: undefined,
  width: null
};

export default TextInput;
