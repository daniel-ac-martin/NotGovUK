import * as React from 'react';
import CheckboxesAndRadios from './checkboxes-and-radios';
import Hint from './hint';
import Label from './label';
import { bem, className } from '../../helpers';

const Checkboxes: React.SFC<any> = props => (
  <CheckboxesAndRadios
    id={props.id}
    className={props.className}
    label={props.label}
    hint={props.hint}
    error={props.error}
    inline={props.inline}
    small={props.small}
  >
    <div className={bem('govuk-checkboxes', props.small && 'small', props.inline && 'inline')}>
      {props.options.map((v, i) => {
        const id = `${props.id}-checkbox-${i}`;
        return (
          <div className="govuk-checkboxes__item" key={i}>
            <input
              id={id}
              className="govuk-checkboxes__input"
              name={props.name}
              type="checkbox"
              value={v.value}
              checked={v.selected}
              disabled={props.disabled || v.disabled}
              onBlur={props.onBlur}
              onChange={props.onChange}
            />
            <Label htmlFor={id} className="govuk-checkboxes__label">{v.label}</Label>
            {v.hint && <Hint id={`${id}-hint`} className="govuk-checkboxes__hint">{v.hint}</Hint>}
          </div>
        );
      })}
    </div>
  </CheckboxesAndRadios>
);

export default Checkboxes;
