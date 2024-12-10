import { FC, ReactNode, createElement as h } from 'react';
import { SubmitButton } from '@not-govuk/button';
import { classBuilder } from '@not-govuk/component-helpers';
import { FormGroup } from '@not-govuk/form-group';
import { Input, InputProps } from '@not-govuk/input';

import '../assets/StandaloneInput.scss';

export type StandaloneInputProps = InputProps & {
  /** Submit button text */
  button?: ReactNode
  /** Error message */
  error?: ReactNode
  /** Hint */
  hint?: string
  /** Label */
  label?: string
  /** HTML name */
  name: string
};

export const StandaloneInput: FC<StandaloneInputProps> = ({
  button = 'Submit',
  classBlock,
  classModifiers: _classModifiers = [],
  className,
  disabled,
  error,
  hint,
  id: _id,
  label,
  width,
  ...attrs
}) => {
  const classModifiers = [
    error ? 'error' : undefined,
    width ? 'fixed-width' : undefined,
    ...(Array.isArray(_classModifiers) ? _classModifiers : [_classModifiers])
  ];
  const classes = classBuilder('not-govuk-standalone-input', classBlock, classModifiers, className);
  const id = _id || attrs.name;
  const fieldId = `${id}-input`;
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy = ([
    hint && hintId,
    error && errorId
  ]
    .filter(e => e)
    .join(' ') || undefined
  );

  return (
    <FormGroup
      id={id}
      className={classes()}
      fieldId={fieldId}
      label={label}
      hint={hint}
      hintId={hintId}
      error={error}
      errorId={errorId}
      standalone
    >
      <Input
        {...attrs}
        aria-describedby={describedBy}
        classModifiers={classModifiers}
        className={classes('input')}
        disabled={disabled}
        id={fieldId}
        placeholder={hint || label}
        width={width}
      />
      <SubmitButton className={classes('button')} disabled={disabled}>{button}</SubmitButton>
    </FormGroup>
  );
};

StandaloneInput.displayName = 'StandaloneInput';

export default StandaloneInput;
