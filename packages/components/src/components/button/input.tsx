import { FC, createElement as h } from 'react';

const Input: FC<any> = props => (
  <input id={props.id} className={props.className} type={props.type} value={props.text} disabled={props.disabled} onClick={props.onClick} />
);

export default Input;
