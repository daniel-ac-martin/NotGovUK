import { FC, InputHTMLAttributes, ReactNode, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@react-foundry/component-helpers';
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

export type DateInputProps = StandardProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'label' | 'value' | 'defaultValue'> & {
  /** Set to false to remove the day input */
  day?: false
  /** Initial value of the field */
  defaultValue?: Partial<DateInputValue>,
  /** Error message */
  error?: DateInputError,
  /** Hint */
  hint?: ReactNode
  /** HTML id (If not specified then the name will be used) */
  id?: string
  /** Label */
  label: ReactNode
  /** Set to false to remove the month input */
  month?: false
  /** HTML name */
  name: string
  /** Value for controlled fields */
  value?: Partial<DateInputValue>
  /** Set to false to remove the year input */
  year?: false
};

interface WithFormat<T> {
  format?: (v: T) => string
}
interface WithDeformat<T> {
  deformat?: (v: string) => T
}

export type RawField<P, V> = FC<P> & WithFormat<V> & WithDeformat<V>

export const DateInput: RawField<DateInputProps, Partial<DateInputValue>> = ({
  autoComplete,
  classBlock,
  classModifiers,
  className,
  day,
  defaultValue,
  error: _error,
  hint: _hint,
  id: _id,
  label,
  month,
  name,
  value: _value,
  width,
  year,
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
  const example = [
    day === false ? '' : '12',
    month === false ? '' : '11',
    year === false ? '' : '2007'
  ].filter(Boolean).join(' ');
  const hint = (
    _hint === undefined
    ? `For example, ${example}`
    : _hint
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
        {day === false ? null : (
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
        )}
        {month === false ? null : (
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
        )}
        {year === false ? null : (
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
        )}
      </div>
    </FormGroup>
  );
};

const isSet = (v: unknown): boolean =>
  !!(v || v === 0);

const pad = (size: number, v: unknown): string =>
  String(v).padStart(size, '0');

const unpad = (v?: string): string | undefined => (
  !v || isNaN(Number(v))
  ? undefined
  : Number(v).toString()
);

// ISO 8601:2000 omits parts from one end or the other, never from the middle
DateInput.format = (v: Partial<DateInputValue>): string => {
  if (isSet(v.day) && !isSet(v.month) && isSet(v.year)) {
    return '';
  }

  // Each part omitted before the one being added is stood in for by a hyphen
  let result = '';

  if (isSet(v.year)) {
    result = pad(4, v.year);
  }

  if (isSet(v.month)) {
    result = `${result || '-'}-${pad(2, v.month)}`;
  }

  if (isSet(v.day)) {
    result = `${result || '--'}-${pad(2, v.day)}`;
  }

  return result;
};

DateInput.deformat = (v: string): Partial<DateInputValue> => {
  const arr = v.replace('--', '-').split('-');
  const year = unpad(arr[0]);

  return {
    day: unpad(arr[2]),
    month: unpad(arr[1]),
    year: year && pad(4, year)
  };
};

DateInput.displayName = 'DateInput';

export default DateInput;
