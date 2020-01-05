import * as React from 'react';
import FormGroupWithFieldset from './form-group-with-fieldset';

const DateInput: React.SFC<any> = props => {
  const hint = props.hint || 'For example, 12 11 2007';

  return(
    <FormGroupWithFieldset
      id={props.id}
      className={props.className}
      fieldsetClassName="date-input"
      legend={props.label}
      hint={hint}
      error={props.error}
      role="group"
    >
      <div className="item">
        <label htmlFor={`${props.id}-day`}>Day</label>
        <input
          id={`${props.id}-day`}
          name={`${props.name}[day]`}
          type="number"
          pattern="[0-9]*"
          className="width-2"
          defaultValue={props.defaultValue && props.defaultValue.day}
          disabled={props.disabled}
          autoComplete={props.autoComplete && `${props.autoComplete}-day`}
        />
      </div>
      <div className="item">
        <label htmlFor={`${props.id}-month`}>Month</label>
        <input
          id={`${props.id}-month`}
          name={`${props.name}[month]`}
          type="number"
          pattern="[0-9]*"
          className="width-2"
          defaultValue={props.defaultValue && props.defaultValue.month}
          disabled={props.disabled}
          autoComplete={props.autoComplete && `${props.autoComplete}-day`}
        />
      </div>
      <div className="item">
        <label htmlFor={`${props.id}-year`}>Year</label>
        <input
          id={`${props.id}-year`}
          name={`${props.name}[year]`}
          type="number"
          pattern="[0-9]*"
          className="width-4"
          defaultValue={props.defaultValue && props.defaultValue.year}
          disabled={props.disabled}
          autoComplete={props.autoComplete && `${props.autoComplete}-day`}
        />
      </div>
    </FormGroupWithFieldset>
  );
};

export default DateInput;
