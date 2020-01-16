import * as React from 'react';
import Anchor from './anchor';
import Input from './input';
import { className } from '../../helpers';

interface IButtonProps {
  /** Extra CSS classes to be applied */
  className?: string,
  /** Whether the button should be disabled */
  disabled?: boolean,
  /** URL to link to (button will be an anchor instead of an input) */
  href?: string,
  /** HTML id */
  id?: string,
  /** Action to be performed when clicked */
  onClick?: any,
  /** Whether this button is secondary to another */
  secondary?: boolean,
  /** Whether this is a start button */
  start?: boolean,
  /** Whether this is a submit button */
  submit?: boolean,
  /** The text to display on the button */
  value?: string,
  /** Whether this is a dangerous button */
  warning?: boolean
};

/**
 * Use `Button` to give people something to click on.
 */
export const Button: React.SFC<IButtonProps> = props => {
  const type = props.submit ? 'submit' : 'button';
  const anchor = props.href !== null;
  const classes = className(
    anchor ? 'button' : '',
    props.disabled && anchor ? 'disabled' : '',
    props.secondary && (anchor || props.submit) ? 'secondary' : '',
    props.start ? 'start' : '',
    props.warning ? 'warning' : '',
    props.className);
  const text = props.value || (props.start && 'Start now >') || undefined;
  const processedProps = {
    ...props,
    text: text,
    type: type,
    className: classes
  };

  return anchor ? Anchor(processedProps) : Input(processedProps);
};

Button.defaultProps = {
  className: null,
  disabled: false,
  href: null,
  id: null,
  onClick: null,
  secondary: false,
  start: false,
  submit: false,
  value: null,
  warning: false
};

export const StartButton: React.SFC<IButtonProps> = props => Button({ ...Button.defaultProps, ...props, start: true });
export const SubmitButton: React.SFC<IButtonProps> = props => Button({ ...Button.defaultProps, ...props, submit: true });
export default Button;
