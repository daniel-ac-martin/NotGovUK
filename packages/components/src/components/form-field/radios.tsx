import { FC, createElement as h } from 'react';
import CheckboxesAndRadios from './checkboxes-and-radios';
import Hint from './hint';
import Label from './label';
import { bem, className } from '../../helpers';

const Radios: FC<any> = props => (
  <CheckboxesAndRadios
    id={props.id}
    className={props.className}
    label={props.label}
    hint={props.hint}
    error={props.error}
    inline={props.inline}
    small={props.small}
  >
    <div className={bem('govuk-radios', props.small && 'small', props.inline && 'inline')}>
      {props.options.map((v, i) => {
        const id = `${props.id}-radio-${i}`;
        return (
          <div className="govuk-radios__item" key={i}>
            <input
              id={id}
              className="govuk-radios__input"
              name={props.name}
              type="radio"
              value={v.value}
              checked={v.selected}
              disabled={props.disabled || v.disabled}
              onBlur={props.onBlur}
              onChange={props.onChange}
            />
            <Label htmlFor={id} className="govuk-radios__label">{v.label}</Label>
            {v.hint && <Hint id={`${id}-hint`} className="govuk-radios__hint">{v.hint}</Hint>}
          </div>
        );
      })}
    </div>
  </CheckboxesAndRadios>
);

export default Radios;
