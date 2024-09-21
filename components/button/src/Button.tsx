import { ButtonHTMLAttributes, ComponentProps, FC, Fragment, ReactNode, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';
import { A } from '@not-govuk/link';

import '../assets/Button.scss';

type CommonButtonProps = StandardProps & {
  children?: ReactNode
  start?: boolean
};
type AnchorButtonProps = CommonButtonProps & ComponentProps<typeof A>;
type ButtonButtonProps = CommonButtonProps & ButtonHTMLAttributes<HTMLButtonElement>;
export type ButtonProps = AnchorButtonProps | ButtonButtonProps;

const isAnchorProps = (v: ButtonProps): v is AnchorButtonProps => (
  v['href'] !== undefined
);
const isButtonProps = (v: ButtonProps): v is ButtonButtonProps => (
  !isAnchorProps(v)
);

const defaultClassBlock = 'govuk-button';

export const AnchorButton: FC<AnchorButtonProps> = ({
  children,
  classBlock,
  classModifiers: _classModifiers = [],
  draggable = 'false',
  role = 'button',
  start = false,
  ...attrs
}) => {
  const classModifiers = [
    start && 'start',
    ...(Array.isArray(_classModifiers) ? _classModifiers : [_classModifiers])
  ];

  return (
    <A
      data-module={defaultClassBlock}
      {...attrs}
      classBlock={classBlock || defaultClassBlock}
      classModifiers={classModifiers}
      draggable={draggable}
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
  start = false,
  ...attrs
}) => {
  const classModifiers = [
    start && 'start',
    ...(Array.isArray(_classModifiers) ? _classModifiers : [_classModifiers])
  ];
  const classes = classBuilder(defaultClassBlock, classBlock, classModifiers, className);

  return (
    <button
      aria-disabled={!!disabled ? 'true' : undefined}
      data-module={defaultClassBlock}
      disabled={!!disabled}
      {...attrs}
      className={classes()}
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
      {_children}
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
