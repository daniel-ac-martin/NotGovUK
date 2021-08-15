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
  /** List of options to select from */
  options: Option[]
  /** Width of the field in characters (approximate) */
  width?: number
};

export const Select: FC<SelectProps> = ({
  children,
  classBlock,
  classModifiers: _classModifiers = [],
  className,
  defaultValue,
  error,
  hint,
  id: _id,
  label,
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
      <select
        {...attrs}
        aria-describedby={hint && hintId}
        className={classes()}
        defaultValue={defaultValue}
        id={fieldId}
        style={style}
      >
        {options.map((v, i) => {
          const selected = (
            defaultValue === undefined
            ? v.selected
            : (
              Array.isArray(defaultValue)
              ? defaultValue.includes(v.value)
              : defaultValue === v.value
            )
          );

          return (
            <option
              {...v}
              selected={selected}
              key={i}
            >
              {v.label}
            </option>
          );
        } ) }
      </select>
    </FormGroup>
  );
};

Select.displayName = 'Select';

export default Select;
