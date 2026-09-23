import { FC, ReactNode, createElement as h } from 'react';
import { FormGroup, LabelSize } from '@not-govuk/form-group';
import { Input, InputProps } from '@not-govuk/input';

import '../assets/TextInput.scss';

export type TextInputProps = InputProps & {
  /** Error message */
  error?: ReactNode
  /** Hint */
  hint?: ReactNode
  /** Whether the label is the page heading */
  isPageHeading?: boolean
  /** Label */
  label: ReactNode
  /** Size of the label text */
  labelSize?: LabelSize
  /** HTML name */
  name: string
};

export const TextInput: FC<TextInputProps> = ({
  classBlock,
  classModifiers: _classModifiers = [],
  className,
  error,
  hint,
  id: _id,
  isPageHeading,
  label,
  labelSize,
  ...attrs
}) => {
  const classModifiers = [
    error ? 'error' : undefined,
    ...(Array.isArray(_classModifiers) ? _classModifiers : [_classModifiers])
  ];
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
      fieldId={fieldId}
      isPageHeading={isPageHeading}
      label={label}
      labelSize={labelSize}
      hint={hint}
      hintId={hintId}
      error={error}
      errorId={errorId}
    >
      <Input
        {...attrs}
        aria-describedby={describedBy}
        classBlock={classBlock}
        classModifiers={classModifiers}
        className={className}
        id={fieldId}
      />
    </FormGroup>
  );
};

TextInput.displayName = 'TextInput';

export default TextInput;
