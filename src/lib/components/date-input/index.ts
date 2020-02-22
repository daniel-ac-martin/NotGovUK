import {ReactNode, SFC, createElement as h} from 'react';
import FormField from '../form-field';

export interface IDateInputValue {
  day: string
  month: string
  year: string
}

export interface IDateInputPreValidateError {
  day?: string
  month?: string
  year?: string
}

type DateInputError = string | IDateInputPreValidateError;

interface IDateInput {
  /** Identifier for auto-completion */
  autoComplete?: string,
  /** Extra CSS classes to be applied */
  className?: string,
  /** Initial value of the field */
  defaultValue?: IDateInputValue,
  /** Whether the field should be disabled */
  disabled?: boolean,
  /** Error message */
  error?: DateInputError,
  /** Hint */
  hint?: string,
  /** HTML id (If not specified then the name will be used) */
  id?: string,
  /** Label */
  label: ReactNode,
  /** HTML name */
  name: string,
  /** onBlur callback (for controlled fields) */
  onBlur?: (x: string) => any,
  /** onChange callback (for controlled fields) */
  onChange?: (x: string) => any,
  /** Value for controlled fields */
  value?: IDateInputValue
};

interface WithFormat<T> {
  format?: (v: T) => string
}
interface WithDeformat<T> {
  deformat?: (v: string) => T
}

type RawField<P, V> = SFC<P> & WithFormat<V> & WithDeformat<V>

export const DateInput: RawField<IDateInput, IDateInputValue> = props =>
  h(FormField, {
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
    type: 'date',
    value: props.value
  });

DateInput.defaultProps = {
  autoComplete: null,
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

DateInput.format = (v: IDateInputValue): string => {
  const pad = (size: number, v: string): string =>
    String(v).padStart(size, '0');

  const isSet = (v: any): boolean =>
    !!(v || v === 0);

  if (isSet(v.day) && isSet(v.month) && isSet(v.year)) {

    const dd = pad(2, v.day);
    const mm = pad(2, v.month);
    const yyyy = pad(4, v.year);

    return `${yyyy}-${mm}-${dd}`;
  } else {
    return undefined;
  }
};

DateInput.deformat = (v: string): IDateInputValue => {
  const unpad = (v: any): string => Number(v).toString();

  const arr = v.split('-');

  return (
    arr.length === 3 ? {
      day: unpad(arr[2]),
      month: unpad(arr[1]),
      year: arr[0]
    } : undefined
  );
};

export default DateInput;
