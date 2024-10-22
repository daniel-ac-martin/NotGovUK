import { FC, SelectHTMLAttributes, ReactNode, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';
import { FormGroup } from '@not-govuk/form-group';

import '../assets/Select.scss';

export type Option = {
  conditional?: ReactNode
  disabled?: boolean
  hint?: string
  label: string
  selected?: boolean
  value: string
};

export type SelectProps = StandardProps & Omit<SelectHTMLAttributes<HTMLSelectElement>, 'label'> & {
  /** Error message */
  error?: string
  /** Hint */
  hint?: string
  /** HTML id (If not specified then the name will be used) */
  id?: string
  /** Label */
  label: ReactNode
  /** HTML name */
  name: string
  /** List of options to select from */
  options: Option[]
  /** Width of the field in characters (approximate) */
  width?: number
};

export const Select: FC<SelectProps> = ({
  classBlock,
  classModifiers: _classModifiers = [],
  className,
  defaultValue: _defaultValue,
  error,
  hint,
  id: _id,
  label,
  multiple,
  options,
  width,
  ...attrs
}) => {
  const classModifiers = [
    error && 'error',
    ...(Array.isArray(_classModifiers) ? _classModifiers : [_classModifiers])
  ];
  const classes = classBuilder('govuk-select', classBlock, classModifiers, className);
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
  const defaultValuePre = _defaultValue || (
    options
      .filter((x) => x.selected)
      .map(x => x.value)
  );
  const defaultValue = (
    !Array.isArray(defaultValuePre)
    ? defaultValuePre
    : (
      defaultValuePre.length === 0
      ? undefined
      : (
        multiple
        ? defaultValuePre
        : defaultValuePre[0]
      )
    )
  );

  return (
    <FormGroup
      id={id}
      fieldId={fieldId}
      label={label}
      hint={hint}
      hintId={hintId}
      error={error}
      errorId={errorId}
    >
      <select
        {...attrs}
        aria-describedby={describedBy}
        className={classes()}
        defaultValue={defaultValue}
        id={fieldId}
        multiple={multiple}
        style={style}
      >
        {options.map(({ label, selected, ...attrs }, i) => (
            <option
              {...attrs}
              key={i}
            >
              {label}
            </option>
          )
        ) }
      </select>
    </FormGroup>
  );
};

Select.displayName = 'Select';

export default Select;
