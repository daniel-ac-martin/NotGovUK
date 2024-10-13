import { FC, InputHTMLAttributes, ReactNode, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';
import { FormGroup } from '@not-govuk/form-group';
import { Input } from '@not-govuk/input';
import { Label } from '@not-govuk/label';

import '../assets/DateInput.scss';

export type DateInputValue = {
  day: string
  month: string
  year: string
}

export type DateInputPreValidateError = {
  day?: string
  month?: string
  year?: string
}

export type DateInputError = ReactNode | DateInputPreValidateError;

export const isPreValidateError = (v: DateInputError): v is DateInputPreValidateError => (
  !!v && typeof v === 'object' && (
    'day' in v ||
    'month' in v ||
    'year' in v
  )
);

export type DateInputProps = StandardProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'label'> & {
  /** Initial value of the field */
  defaultValue?: DateInputValue,
  /** Error message */
  error?: DateInputError,
  /** Hint */
  hint?: ReactNode
  /** HTML id (If not specified then the name will be used) */
  id?: string
  /** Label */
  label: ReactNode
  /** HTML name */
  name: string
  /** Value for controlled fields */
  value?: DateInputValue
};

interface WithFormat<T> {
  format?: (v: T) => string
}
interface WithDeformat<T> {
  deformat?: (v: string) => T
}

export type RawField<P, V> = FC<P> & WithFormat<V> & WithDeformat<V>

export const DateInput: RawField<DateInputProps, DateInputValue> = ({
  autoComplete,
  classBlock,
  classModifiers,
  className,
  defaultValue,
  error: _error,
  hint = 'For example, 12 11 2007',
  id: _id,
  label,
  name,
  value: _value,
  width,
  ...attrs
}) => {
  const classes = classBuilder('govuk-date-input', classBlock, classModifiers, className);
  const id = _id || name;
  const hintId = `${id}-hint`;
  const { error, invalid } = (
    isPreValidateError(_error)
    ? {
      error: _error.day || _error.month || _error.year,
      invalid: {
        day: _error && (!(_error instanceof Object) || _error.day),
        month: _error && (!(_error instanceof Object) || _error.month),
        year: _error && (!(_error instanceof Object) || _error.year)
      }
    }
    : {
      error: _error,
      invalid: {
        day: undefined,
        month: undefined,
        year: undefined
      }
    }
  );
  const partValue = (v: any) => (
    v == null
    ? ''
    : v
  );
  const value = (
    _value === undefined
    ? {
      day: undefined,
      month: undefined,
      year: undefined
    } : {
      day: partValue(_value.day),
      month: partValue(_value.month),
      year: partValue(_value.year)
    }
  );

  return (
    <FormGroup
      id={id}
      label={label}
      hint={hint}
      hintId={hintId}
      error={error}
    >
      <div className={classes()}>
        <div className={classes('item')}>
          <Label htmlFor={`${id}-day`}>Day</Label>
          <Input
            {...attrs}
            id={`${id}-day`}
            name={`${name}[day]`}
            type="text"
            inputMode="numeric"
            className={classes('input')}
            classModifiers={['width-2', invalid.day && 'error']}
            defaultValue={defaultValue && defaultValue.day}
            autoComplete={autoComplete && `${autoComplete}-day`}
            value={value.day}
          />
        </div>
        <div className={classes('item')}>
          <Label htmlFor={`${id}-month`}>Month</Label>
          <Input
            {...attrs}
            id={`${id}-month`}
            name={`${name}[month]`}
            type="text"
            inputMode="numeric"
            className={classes('input')}
            classModifiers={['width-2', invalid.month && 'error']}
            defaultValue={defaultValue && defaultValue.month}
            autoComplete={autoComplete && `${autoComplete}-month`}
            value={value.month}
          />
        </div>
        <div className={classes('item')}>
          <Label htmlFor={`${id}-year`}>Year</Label>
          <Input
            {...attrs}
            id={`${id}-year`}
            name={`${name}[year]`}
            type="text"
            inputMode="numeric"
            className={classes('input')}
            classModifiers={['width-4', invalid.year && 'error']}
            defaultValue={defaultValue && defaultValue.year}
            autoComplete={autoComplete && `${autoComplete}-year`}
            value={value.year}
          />
        </div>
      </div>
    </FormGroup>
  );
};

DateInput.format = (v: DateInputValue): string => {
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
    return '';
  }
};

DateInput.deformat = (v: string): DateInputValue => {
  const unpad = (v: any): string => Number(v).toString();

  const arr = v.split('-');

  return (
    arr.length === 3 ? {
      day: unpad(arr[2]),
      month: unpad(arr[1]),
      year: arr[0]
    } : {
      day: '',
      month: '',
      year: ''
    }
  );
};

DateInput.displayName = 'DateInput';

export default DateInput;
