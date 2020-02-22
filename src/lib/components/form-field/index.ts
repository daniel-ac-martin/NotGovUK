import * as React from 'react';
import Checkboxes from './checkboxes';
import DateInput from './date-input';
import Input from './input';
import Radios from './radios';
import Select from './select';
import Textarea from './textarea';
import { className } from '../../helpers';
import { IDateInputValue, IDateInputPreValidateError } from '../date-input';

interface IOption {
  disabled?: boolean,
  hint?: string,
  label: string,
  selected?: boolean,
  value: string
};

export type SelectValue = string | string[];
type Value = SelectValue | IDateInputValue;
type FormFieldError = string | IDateInputPreValidateError;

interface IFormField {
  /** Identifier for auto-completion */
  autoComplete?: string,
  /** Extra CSS classes to be applied */
  className?: string,
  /** Initial value of the field */
  defaultValue?: Value,
  /** Whether the field should be disabled */
  disabled?: boolean,
  /** Error message */
  error?: FormFieldError,
  /** Hint */
  hint?: string,
  /** HTML id (If not specified then the name will be used) */
  id?: string,
  /** Whether checkboxes and radios should be displayed on a single line on wide displays (inferred from number of options if not provided)*/
  inline?: boolean,
  /** Label */
  label: any,
  /** Whether multiple options can be selected */
  multiple?: boolean,
  /** HTML name */
  name: string,
  /** onBlur callback (for controlled fields) */
  onBlur?: (x: string) => any,
  /** onChange callback (for controlled fields) */
  onChange?: (x: string) => any,
  /** List of options to select from */
  options?: Array<IOption>,
  /** Initial number of lines of input on a textarea or the size of a multi-select */
  rows?: number,
  /** Whether checkboxes and radios should be small (inferred from number of options if not provided) */
  small?: boolean,
  /** Whether the browser should spellcheck the input */
  spellCheck?: boolean,
  /** Type of field (inferred if not provided) */
  type?: string,
  /** Value for controlled fields */
  value?: Value,
  /** Width of the field in characters (approximate) (only applies to single input fields) */
  width?: number
};

export const isArray = <T>(v: any): v is Array<T> => v instanceof Array;

export const FormField: React.SFC<IFormField> = props => {
  let inferredType;
  if (props.options) {
    if (props.options.length < 8) {
      inferredType = props.multiple ? 'checkboxes' : 'radios';
    } else {
      inferredType = 'select';
    }
  }
  else if (props.rows) {
    inferredType = 'textarea';
  } else {
    inferredType = 'text'
  }

  const type = props.type || inferredType;
  const selected = (option: IOption) => (
    isArray(props.defaultValue)
      ? {
        ...option,
        selected: props.defaultValue.includes(option.value)
      } : option
  );
  const processedProps = {
    ...props,
    className: className(props.error && 'error', props.className),
    defaultValue: props.value === undefined ? props.defaultValue : undefined,
    fieldStyle: props.width && { maxWidth: (((props.width >= 10) ? 4.76 : 1.76) + 1.81 * props.width) + 'ex' },
    id: props.id || props.name,
    inline: (props.inline === null && (type === 'radios' && props.options && props.options.length <= 2)) || props.inline,
    options: (
      props.options && props.value === undefined
        ? props.options.map(selected)
        : props.options
    ),
    rows: (props.rows === null && (type === 'textarea' && 5)) || props.rows,
    small: (props.small === null && (props.options && props.options.length >= 6)) || props.small,
    spellcheck:
      props.spellCheck !== null ? (props.spellCheck ? 'true' : 'false') :
      type === 'textarea' ? 'true' :
      undefined,
    type: type === 'native-date' ? 'date' : type,
    value: props.value
  };

  return (
    type === 'checkboxes' ? Checkboxes(processedProps) :
    type === 'date' ? DateInput(processedProps) :
    type === 'radios' ? Radios(processedProps) :
    type === 'select' ? Select(processedProps) :
    type === 'textarea' ? Textarea(processedProps) :
    Input(processedProps)
  );
};

FormField.defaultProps = {
  autoComplete: null,
  className: null,
  defaultValue: undefined,
  disabled: false,
  error: null,
  hint: null,
  id: null,
  inline: null,
  multiple: null,
  onBlur: null,
  onChange: null,
  options: null,
  rows: null,
  small: null,
  spellCheck: null,
  value: undefined,
  width: null
};

export default FormField;
