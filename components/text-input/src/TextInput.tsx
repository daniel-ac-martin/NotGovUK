import { ElementType, FC, ReactNode, createElement as h } from 'react';
import { FormGroup } from '@not-govuk/form-group';
import { Input, InputProps } from '@not-govuk/input';

import '../assets/TextInput.scss';

export type TextInputProps = InputProps & {
  /** Error message */
  error?: ReactNode
  /** Hint */
  hint?: ReactNode
  /** Label */
  label: ReactNode
  /** Caption for the section the question belongs to, shown above the label */
  labelCaption?: ReactNode
  /** BEM style modifiers to apply to the label */
  labelClassModifiers?: InputProps['classModifiers']
  /** Component to wrap the label in, making it a heading */
  labelHeading?: ElementType
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
  label,
  labelCaption,
  labelClassModifiers,
  labelHeading,
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
      labelHeading={labelHeading}
      id={id}
      fieldId={fieldId}
      label={label}
      labelCaption={labelCaption}
      labelClassModifiers={labelClassModifiers}
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
