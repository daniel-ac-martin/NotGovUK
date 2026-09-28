'use client';

import { ButtonHTMLAttributes, ComponentProps, FC, Fragment, MouseEvent, MouseEventHandler, ReactNode, createElement as h, useRef } from 'react';
import { StandardProps, classBuilder } from '@react-foundry/component-helpers';
import { A } from '@not-govuk/link';

import '../assets/Button.scss';

type CommonButtonProps = StandardProps & {
  children?: ReactNode
  /** Prevent accidental double clicks on submit buttons from submitting forms multiple times. A click within one second of the last accepted click is ignored. */
  preventDoubleClick?: boolean
  start?: boolean
};
type AnchorButtonProps = CommonButtonProps & ComponentProps<typeof A>;
type ButtonButtonProps = CommonButtonProps & ButtonHTMLAttributes<HTMLButtonElement>;
export type ButtonProps = AnchorButtonProps | ButtonButtonProps;

const isAnchorProps = (v: ButtonProps): v is AnchorButtonProps => (
  'href' in v
);
const isButtonProps = (v: ButtonProps): v is ButtonButtonProps => (
  !isAnchorProps(v)
);

const defaultClassBlock = 'govuk-button';
const debounceTimeout = 1000;

// Mirrors the debounce in govuk-frontend's Button JavaScript
// See: https://github.com/alphagov/govuk-frontend/blob/v6.5.1/packages/govuk-frontend/src/govuk/components/button/button.mjs
const useDebouncedClick = <T extends Element>(
  preventDoubleClick: boolean,
  onClick?: MouseEventHandler<T>
): MouseEventHandler<T> | undefined => {
  const lastClick = useRef<number | undefined>(undefined);

  return !preventDoubleClick ? onClick : (e: MouseEvent<T>) => {
    const now = Date.now();

    if (lastClick.current !== undefined && now - lastClick.current < debounceTimeout) {
      e.preventDefault();
    } else {
      lastClick.current = now;
      onClick && onClick(e);
    }
  };
};

export const AnchorButton: FC<AnchorButtonProps> = ({
  children,
  classBlock,
  classModifiers: _classModifiers = [],
  draggable = 'false',
  onClick: _onClick,
  preventDoubleClick = false,
  role = 'button',
  start = false,
  ...attrs
}) => {
  const classModifiers = [
    start ? 'start' : undefined,
    ...(Array.isArray(_classModifiers) ? _classModifiers : [_classModifiers])
  ];
  const onClick = useDebouncedClick(preventDoubleClick, _onClick);

  return (
    <A
      data-module={defaultClassBlock}
      data-prevent-double-click={preventDoubleClick ? 'true' : undefined}
      {...attrs}
      classBlock={classBlock || defaultClassBlock}
      classModifiers={classModifiers}
      draggable={draggable}
      onClick={onClick}
      role={role}
    >
      {children}
    </A>
  );
};

export const ButtonButton: FC<ButtonButtonProps> = ({
  children,
  classBlock,
  classModifiers: _classModifiers = [],
  className,
  disabled = false,
  onClick: _onClick,
  preventDoubleClick = false,
  start = false,
  type = 'submit',
  ...attrs
}) => {
  const classModifiers = [
    start ? 'start' : undefined,
    ...(Array.isArray(_classModifiers) ? _classModifiers : [_classModifiers])
  ];
  const classes = classBuilder(defaultClassBlock, classBlock, classModifiers, className);
  const onClick = useDebouncedClick(preventDoubleClick, _onClick);

  return (
    <button
      aria-disabled={!!disabled ? 'true' : undefined}
      data-module={defaultClassBlock}
      data-prevent-double-click={preventDoubleClick ? 'true' : undefined}
      disabled={!!disabled}
      type={type}
      {...attrs}
      className={classes()}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const Button: FC<ButtonProps> = ({
  children: _children,
  ...props
}) => {
  const classes = classBuilder(defaultClassBlock, props.classBlock, props.classModifiers, props.className);
  const children = (
    <Fragment>
      {!(props.start && typeof _children !== 'string') ? _children : (
        <span>{_children}</span>
      )}
      {!props.start ? null : (
        <svg
          className={classes('start-icon')}
          xmlns="http://www.w3.org/2000/svg"
          width="17.5"
          height="19"
          viewBox="0 0 33 40"
          aria-hidden="true"
          focusable="false"
        >
          <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z" />
        </svg>
      ) }
    </Fragment>
  );

  if (isAnchorProps(props)) {
    return (
      <AnchorButton {...props}>
        {children}
      </AnchorButton>
    );
  } else if (isButtonProps(props)) {
    return (
      <ButtonButton {...props}>
        {children}
      </ButtonButton>
    );
  } else {
    // This should be unreachable, but TypeScript requires it
    return (<Fragment></Fragment>);
  }
};

export const StartButton: FC<AnchorButtonProps> = ({
  children = 'Start now',
  ...props
}) => (
  <Button
    {...props}
    start
  >
    {children}
  </Button>
);

export const SubmitButton: FC<ButtonButtonProps> = ({
  children,
  ...props
}) => (
  <Button
    {...props}
    type="submit"
  >
    {children}
  </Button>
);

Button.displayName = 'Button';
StartButton.displayName = 'StartButton';
SubmitButton.displayName = 'SubmitButton';

export default Button;
