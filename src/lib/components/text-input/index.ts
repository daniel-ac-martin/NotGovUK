import * as React from 'react';
import FormField from '../form-field';

interface ITextInput {
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
  name: string
  /** Whether the browser should spellcheck the input */
  spellCheck?: boolean,
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
    spellCheck: props.spellCheck,
    type: 'text',
    width: props.width
  });

TextInput.defaultProps = {
  autoComplete: null,
  className: null,
  defaultValue: null,
  disabled: false,
  error: null,
  hint: null,
  id: null,
  spellCheck: null,
  width: null
};

export default TextInput;
