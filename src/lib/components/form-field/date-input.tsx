import * as React from 'react';
import FormGroupWithFieldset from './form-group-with-fieldset';
import Label from './label';
import { bem, className } from '../../helpers';

const DateInput: React.SFC<any> = props => {
  const hint: string = props.hint || 'For example, 12 11 2007';
  const error: string = props.error && (props.error.day || props.error.month || props.error.year || props.error);
  const invalid = {
    day: props.error && (!(props.error instanceof Object) || props.error.day),
    month: props.error && (!(props.error instanceof Object) || props.error.month),
    year: props.error && (!(props.error instanceof Object) || props.error.year)
  };
  const partValue = v => (
    v == null
      ? ''
      : v
  );
  const value = (
    props.value === undefined
    ? {
      day: undefined,
      month: undefined,
      year: undefined
    } : {
      day: partValue(props.value.day),
      month: partValue(props.value.month),
      year: partValue(props.value.year)
    }
  );

  return(
    <FormGroupWithFieldset
      id={props.id}
      className={props.className}
      fieldsetClassName="date-input"
      legend={props.label}
      hint={hint}
      error={error}
      role="group"
    >
      <div className="govuk-date-input">
        <div className="govuk-date-input__item">
          <Label htmlFor={`${props.id}-day`}>Day</Label>
          <input
            id={`${props.id}-day`}
            name={`${props.name}[day]`}
            type="text"
            pattern="[0-9]*"
            inputMode="numeric"
            className={className('govuk-date-input__input', bem('govuk-input', 'width-2', invalid.day && 'error'))}
            defaultValue={props.defaultValue && props.defaultValue.day}
            disabled={props.disabled}
            autoComplete={props.autoComplete && `${props.autoComplete}-day`}
            onBlur={props.onBlur}
            onChange={props.onChange}
            value={value.day}
          />
        </div>
        <div className="govuk-date-input__item">
          <Label htmlFor={`${props.id}-month`}>Month</Label>
          <input
            id={`${props.id}-month`}
            name={`${props.name}[month]`}
            type="text"
            pattern="[0-9]*"
            inputMode="numeric"
            className={className('govuk-date-input__input', bem('govuk-input', 'width-2', invalid.month && 'error'))}
            defaultValue={props.defaultValue && props.defaultValue.month}
            disabled={props.disabled}
            autoComplete={props.autoComplete && `${props.autoComplete}-month`}
            onBlur={props.onBlur}
            onChange={props.onChange}
            value={value.month}
          />
        </div>
        <div className="govuk-date-input__item">
          <Label htmlFor={`${props.id}-year`}>Year</Label>
          <input
            id={`${props.id}-year`}
            name={`${props.name}[year]`}
            type="text"
            pattern="[0-9]*"
            inputMode="numeric"
            className={className('govuk-date-input__input', bem('govuk-input', 'width-4', invalid.year && 'error'))}
            defaultValue={props.defaultValue && props.defaultValue.year}
            disabled={props.disabled}
            autoComplete={props.autoComplete && `${props.autoComplete}-year`}
            onBlur={props.onBlur}
            onChange={props.onChange}
            value={value.year}
          />
        </div>
      </div>
    </FormGroupWithFieldset>
  );
};

export default DateInput;
