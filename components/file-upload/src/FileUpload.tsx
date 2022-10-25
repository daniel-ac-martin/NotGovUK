import { FC, ReactNode, createElement as h } from 'react';
import { classBuilder } from '@not-govuk/component-helpers';
import { FormGroup } from '@not-govuk/form-group';
import { Input, InputProps } from '@not-govuk/input';

import '../assets/FileUpload.scss';

export type FileUploadProps = Omit<InputProps, 'type'> & {
  /** Error message */
  error?: ReactNode
  /** Hint */
  hint?: ReactNode
  /** Label */
  label: ReactNode
};

export const FileUpload: FC<FileUploadProps> = ({
  children,
  classBlock,
  classModifiers: _classModifiers = [],
  className,
  error,
  hint,
  id: _id,
  label,
  ...attrs
}) => {
  const classModifiers = [
    error && 'error',
    ...(Array.isArray(_classModifiers) ? _classModifiers : [_classModifiers])
  ];
  const classes = classBuilder('govuk-file-upload', classBlock, classModifiers, className);
  const id = _id || attrs.name;
  const fieldId = `${id}-input`;
  const hintId = `${id}-hint`;

  return (
    <FormGroup
      id={id}
      fieldId={fieldId}
      label={label}
      hint={hint}
      hintId={hintId}
      error={error}
    >
      <Input
        {...attrs}
        type="file"
        className={classes()}
        aria-describedby={hint && hintId}
        id={fieldId}
      />
    </FormGroup>
  );
};

FileUpload.displayName = 'FileUpload';

export default FileUpload;
