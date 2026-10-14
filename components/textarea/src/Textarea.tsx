import { ElementType, FC, TextareaHTMLAttributes, ReactNode, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@react-foundry/component-helpers';
import { FormGroup } from '@not-govuk/form-group';

import '../assets/Textarea.scss';

export type TextareaProps = StandardProps & TextareaHTMLAttributes<HTMLTextAreaElement> & {
  /** Error message */
  error?: ReactNode
  /** Hint */
  hint?: ReactNode
  /** Label */
  label: ReactNode
  /** Caption for the section the question belongs to, shown above the label */
  labelCaption?: ReactNode
  /** BEM style modifiers to apply to the label */
  labelClassModifiers?: StandardProps['classModifiers']
  /** Component to wrap the label in, making it a heading */
  labelHeading?: ElementType
  /** HTML name */
  name: string
  /** Width of the field in characters (approximate) */
  width?: number
};

export const Textarea: FC<TextareaProps> = ({
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
  rows = 5,
  width,
  ...attrs
}) => {
  const classModifiers = [
    error ? 'error' : undefined,
    ...(Array.isArray(_classModifiers) ? _classModifiers : [_classModifiers])
  ];
  const classes = classBuilder('govuk-textarea', classBlock, classModifiers, className);
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

  const maxWidth = width && (
    (((width >= 10) ? 4.76 : 1.76) + 1.81 * width) + 'ex'
  );
  const style = (
    maxWidth === undefined ? undefined : {
      maxWidth
    }
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
      <textarea
        {...attrs}
        aria-describedby={describedBy}
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
