import * as React from 'react';

const Input: React.SFC<any> = props => (
  <input id={props.id} className={props.className} type={props.type} value={props.text} disabled={props.disabled} onClick={props.onClick} />
);

export default Input;
