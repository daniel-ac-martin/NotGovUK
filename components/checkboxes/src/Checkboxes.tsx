import { FC, InputHTMLAttributes, ReactNode, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@react-foundry/component-helpers';
import { FormGroup, LabelSize } from '@not-govuk/form-group';
import { Checkbox } from './Checkbox';

import '../assets/Checkboxes.scss';

export type Option = {
  /** Content to render only when the option is selected */
  conditional?: ReactNode
  /** Whether the the option is disabled */
  disabled?: boolean
  /** Whether the option can only be selected on its own */
  exclusive?: boolean
  /** Hint for the option */
  hint?: string
  /** Label for the option */
  label: ReactNode
  /** Whether the option is selected */
  selected?: boolean
  /** Value of the option */
  value: string
};

export type OptionOrSeperator = string | Option;

export const isSeperator = (v: OptionOrSeperator): v is string => (
  typeof v === 'string'
);

export const isOption = (v: OptionOrSeperator): v is Option => !isSeperator(v);

export type CheckboxesProps = StandardProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'label'> & {
  /** Error message */
  error?: ReactNode
  /** Hint */
  hint?: ReactNode
  /** HTML id (If not specified then the name will be used) */
  id?: string
  /** Whether the label is the page heading */
  isPageHeading?: boolean
  /** Label */
  label: ReactNode
  /** Size of the label text */
  labelSize?: LabelSize
  /** HTML name */
  name: string
  /** List of options to select from */
  options: OptionOrSeperator[]
};

export const Checkboxes: FC<CheckboxesProps> = ({
  classBlock,
  classModifiers,
  className,
  defaultValue,
  error,
  hint,
  id: _id,
  isPageHeading,
  label,
  labelSize,
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
      isPageHeading={isPageHeading}
      label={label}
      labelSize={labelSize}
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
