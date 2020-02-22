import * as React from 'react';
import FormGroupWithFieldset from './form-group-with-fieldset';
import { className } from '../../helpers';

const DateInput: React.SFC<any> = props => {
  const hint: string = props.hint || 'For example, 12 11 2007';
  const error: string = props.error && (props.error.day || props.error.month || props.error.year || props.error);
  const innocent = {
    day: props.error && props.error instanceof Object && !props.error.day,
    month: props.error && props.error instanceof Object && !props.error.month,
    year: props.error && props.error instanceof Object && !props.error.year
  };
  const value = (
    props.value === undefined
    ? {
      day: undefined,
      month: undefined,
      year: undefined
    } : {
      day: props.value.day || '',
      month: props.value.month || '',
      year: props.value.year || ''
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
      <div className="item">
        <label htmlFor={`${props.id}-day`}>Day</label>
        <input
          id={`${props.id}-day`}
          name={`${props.name}[day]`}
          type="text"
          pattern="[0-9]*"
          className={className("width-2", innocent.day && 'innocent')}
          defaultValue={props.defaultValue && props.defaultValue.day}
          disabled={props.disabled}
          autoComplete={props.autoComplete && `${props.autoComplete}-day`}
          onBlur={props.onBlur}
          onChange={props.onChange}
          value={value.day}
        />
      </div>
      <div className="item">
        <label htmlFor={`${props.id}-month`}>Month</label>
        <input
          id={`${props.id}-month`}
          name={`${props.name}[month]`}
          type="text"
          pattern="[0-9]*"
          className={className("width-2", innocent.month && 'innocent')}
          defaultValue={props.defaultValue && props.defaultValue.month}
          disabled={props.disabled}
          autoComplete={props.autoComplete && `${props.autoComplete}-month`}
          onBlur={props.onBlur}
          onChange={props.onChange}
          value={value.month}
        />
      </div>
      <div className="item">
        <label htmlFor={`${props.id}-year`}>Year</label>
        <input
          id={`${props.id}-year`}
          name={`${props.name}[year]`}
          type="text"
          pattern="[0-9]*"
          className={className("width-4", innocent.year && 'innocent')}
          defaultValue={props.defaultValue && props.defaultValue.year}
          disabled={props.disabled}
          autoComplete={props.autoComplete && `${props.autoComplete}-year`}
          onBlur={props.onBlur}
          onChange={props.onChange}
          value={value.year}
        />
      </div>
    </FormGroupWithFieldset>
  );
};

export default DateInput;
