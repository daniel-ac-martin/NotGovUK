import React from 'react';

const prop2Class = {
  'href': 'button',
  'secondary': 'secondary',
  'start': 'start',
  'warning': 'warning'
};

const Button = props => {
  const type = props.submit ? 'submit' : 'button';
  const propClasses = props.className ? props.className.split(' ') : [];
  const className = Object.keys(props)
        .map(e => prop2Class[e])
        .concat(props.href !== undefined && props.disabled ? ['disabled'] : [])
        .concat(propClasses)
        .filter(e => e !== undefined)
        .join(' ') || undefined;
  const text = props.value || props.start && 'Start now >';

  if (props.href !== undefined) {
    return (
        <a id={props.id} className={className} href={props.href}>{text}</a>
    );
  } else {
    return (
        <input id={props.id} className={className} type={type} value={text} disabled={props.disabled} onClick={props.onClick} />
    );
  }
};

export default Button;
export const StartButton = props => Button({ start: 'start', ...props });
export const SubmitButton = props => Button({ submit: 'submit', ...props });
