import { FC, InputHTMLAttributes, ReactNode, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';
import { FormGroup } from '@not-govuk/form-group';
import { Checkbox } from './Checkbox.js';

import '../assets/Checkboxes.scss';

export type Option = {
  conditional?: ReactNode
  disabled?: boolean
  exclusive?: boolean
  hint?: string
  label: string
  selected?: boolean
  value: string
};

export type OptionOrSeperator = string | Option;

export const isSeperator = (v: OptionOrSeperator): v is string => (
  typeof v === 'string'
);

export const isOption = (v: OptionOrSeperator): v is Option => !isSeperator(v);

export type CheckboxesProps = StandardProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'label'> & {
  /** Error message */
  error?: string
  /** Hint */
  hint?: string
  /** HTML id (If not specified then the name will be used) */
  id?: string
  /** Label */
  label: ReactNode
  /** List of options to select from */
  options: OptionOrSeperator[]
};

export const Checkboxes: FC<CheckboxesProps> = ({
  children,
  classBlock,
  classModifiers,
  className,
  defaultValue,
  error,
  hint,
  id: _id,
  label,
  options,
  value,
  ...attrs
}) => {
  const classes = classBuilder('govuk-checkboxes', classBlock, classModifiers, className);
  const id = _id || attrs.name;
  const hintId = `${id}-hint`;

  return (
    <FormGroup
      id={id}
      label={label}
      hint={hint}
      hintId={hintId}
      error={error}
    >
      <div className={classes()}>
        {options.map((v, i) => {
          if (isOption(v)) {
            const optionId = `${id}-checkbox-${i}`;
            const { exclusive, selected, ...rest } = v;
            const defaultChecked = (
              defaultValue === undefined
              ? selected
              : (
                Array.isArray(defaultValue)
                  ? defaultValue.includes(v.value)
                  : defaultValue === v.value
              )
            );

            return (
              <Checkbox
                {...rest}
                {...attrs}
                classes={classes}
                defaultChecked={defaultChecked}
                id={optionId}
                key={i}
              />
            );
          } else {
            return (
              <div className={classes('divider')} key={i}>
                {v}
              </div>
            );
          }
        } ) }
      </div>
    </FormGroup>
  );
};

Checkboxes.displayName = 'Checkboxes';

export default Checkboxes;
