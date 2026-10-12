import { FC, InputHTMLAttributes, ReactNode, createElement as h } from 'react';
import { StandardProps } from '@react-foundry/component-helpers';
import { Checkbox, CheckboxProps } from './Checkbox';
import { CheckboxesContainer, CheckboxesContainerProps } from './CheckboxesContainer';
import { CheckboxesDivider, CheckboxesDividerProps } from './CheckboxesDivider';

import '../assets/Checkboxes.scss';

export type { CheckboxProps, CheckboxesContainerProps, CheckboxesDividerProps };

export type Option = {
  /** Content to render only when the option is selected */
  conditional?: ReactNode
  /** Content for the option, rendered outside of its label */
  content?: ReactNode
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
  /** Label */
  label: ReactNode
  /** HTML name */
  name: string
  /** List of options to select from */
  options: OptionOrSeperator[]
};

const CheckboxesComponent: FC<CheckboxesProps> = ({
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
  const id = _id || attrs.name;

  return (
    <CheckboxesContainer
      classBlock={classBlock}
      classModifiers={classModifiers}
      className={className}
      error={error}
      hint={hint}
      id={id}
      label={label}
    >
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
              classBlock={classBlock}
              {...rest}
              {...attrs}
              defaultChecked={defaultChecked}
              id={optionId}
              key={i}
            />
          );
        } else {
          return (
            <CheckboxesDivider classBlock={classBlock} key={i}>
              {v}
            </CheckboxesDivider>
          );
        }
      } ) }
    </CheckboxesContainer>
  );
};

export const Checkboxes: FC<CheckboxesProps> & {
  Container: FC<CheckboxesContainerProps>,
  Divider: FC<CheckboxesDividerProps>,
  Item: FC<CheckboxProps>
} = Object.assign(CheckboxesComponent, {
  Container: CheckboxesContainer,
  Divider: CheckboxesDivider,
  Item: Checkbox
});

Checkboxes.displayName = 'Checkboxes';

export default Checkboxes;
