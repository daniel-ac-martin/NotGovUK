import * as React from 'react';
import CheckboxesAndRadios from './checkboxes-and-radios';
import Hint from './hint';
import { className } from '../../helpers';

const Checkboxes: React.SFC<any> = props => (
  <CheckboxesAndRadios
    id={props.id}
    className={className('checkboxes', props.className)}
    label={props.label}
    hint={props.hint}
    error={props.error}
    inline={props.inline}
    small={props.small}
  >
    {props.options.map((v, i) => {
      const id = `${props.id}-checkbox-${i}`;
      return (
        <div className="item" key={i}>
            <input id={id} name={`${props.name}[]`} type="checkbox" value={v.value} checked={v.selected} disabled={props.disabled || v.disabled} />
            <label htmlFor={id}>{v.label}</label>
            {v.hint && <Hint id={`${id}-hint`}>{v.hint}</Hint>}
        </div>
      );
    })}
  </CheckboxesAndRadios>
);

export default Checkboxes;
