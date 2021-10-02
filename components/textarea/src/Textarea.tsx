import { FC, TextareaHTMLAttributes, ReactNode, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';
import { FormGroup } from '@not-govuk/form-group';

import '../assets/Textarea.scss';

export type TextareaProps = StandardProps & TextareaHTMLAttributes<HTMLTextAreaElement> & {
  /** Error message */
  error?: ReactNode
  /** Hint */
  hint?: ReactNode
  /** Label */
  label: ReactNode
  /** Width of the field in characters (approximate) */
  width?: number
};

export const Textarea: FC<TextareaProps> = ({
  children,
  classBlock,
  classModifiers: _classModifiers = [],
  className,
  error,
  hint,
  id: _id,
  label,
  rows = 5,
  width,
  ...attrs
}) => {
  const classModifiers = [
    error && 'error',
    ...(Array.isArray(_classModifiers) ? _classModifiers : [_classModifiers])
  ];
  const classes = classBuilder('govuk-textarea', classBlock, classModifiers, className);
  const id = _id || attrs.name;
  const fieldId = `${id}-input`;
  const hintId = `${id}-hint`;
  const maxWidth = width && (
    (((width >= 10) ? 4.76 : 1.76) + 1.81 * width) + 'ex'
  );
  const style = maxWidth && {
    maxWidth
  };

  return (
    <FormGroup
      id={id}
      fieldId={fieldId}
      label={label}
      hint={hint}
      hintId={hintId}
      error={error}
    >
      <textarea
        {...attrs}
        aria-describedby={hint && hintId}
        className={classes()}
        id={fieldId}
        rows={rows}
        style={style}
      />
    </FormGroup>
  );
};

Textarea.displayName = 'Textarea';

export default Textarea;
