'use client';

import { ChangeEventHandler, FC, InputHTMLAttributes, ReactNode, RefObject, createElement as h, createRef, useRef } from 'react';
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
  onChange: _onChange,
  options,
  value,
  ...attrs
}) => {
  const id = _id || attrs.name;
  const boxes = useRef<RefObject<HTMLInputElement | null>[]>([]);
  const boxRef = (i: number) => (boxes.current[i] ||= createRef<HTMLInputElement>());
  const indexesOf = (f: (v: Option) => boolean) => options
    .map((v, i) => (isOption(v) && f(v) ? i : undefined))
    .filter(e => e !== undefined);
  const optionIndexes = indexesOf(() => true);
  const exclusiveIndexes = indexesOf(v => !!v.exclusive);

  // Cleared with a click, so that each box tells its own handlers that it changed.
  // FIXME: One to a task is for Formik, which rebuilds an array field from the values it
  // last rendered, so that changes dispatched together are all computed from the same
  // stale array and only the last of them survives.
  const uncheck = (indexes: number[], except: number) => indexes
    .filter(v => v !== except)
    .forEach(v => setTimeout(() => {
      const box = boxes.current[v]?.current;

      if (box?.checked) {
        box.click();
      }
    }, 0));

  // An exclusive option drives the rest of the group, so the group owns the handler.
  const onChangeFor = (i: number): ChangeEventHandler<HTMLInputElement> => e => {
    if (e.target.checked) {
      uncheck(exclusiveIndexes.includes(i) ? optionIndexes : exclusiveIndexes, i);
    }

    return _onChange && _onChange(e);
  };

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
              onChange={exclusiveIndexes.length ? onChangeFor(i) : _onChange}
              ref={boxRef(i)}
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
