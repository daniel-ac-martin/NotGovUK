'use client';

import { FC, InputHTMLAttributes, ReactNode, createElement as h, useState } from 'react';
import { StandardProps } from '@react-foundry/component-helpers';
import { Radio, RadioProps } from './Radio';
import { RadiosContainer, RadiosContainerProps } from './RadiosContainer';
import { RadiosDivider, RadiosDividerProps } from './RadiosDivider';

import '../assets/Radios.scss';

export type { RadioProps, RadiosContainerProps, RadiosDividerProps };

export type Option = {
  /** Content to render only when the option is selected */
  conditional?: ReactNode
  /** Content for the option, rendered outside of its label */
  content?: ReactNode
  /** Whether the the option is disabled */
  disabled?: boolean
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

export type RadiosProps = StandardProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'label'> & {
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

const RadiosComponent: FC<RadiosProps> = ({
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
  const setState = useState({})[1];
  const forceUpdate = () => setState({});
  const withUpdate = <A, B>(f?: (a: A) => B) => (e: A): B | undefined => {
    forceUpdate();
    return f && f(e);
  };

  const onChange = withUpdate(_onChange);

  return (
    <RadiosContainer
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
          const optionId = `${id}-radio-${i}`;
          const { selected, ...rest } = v;
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
            <Radio
              classBlock={classBlock}
              {...rest}
              {...attrs}
              defaultChecked={defaultChecked}
              id={optionId}
              key={i}
              onChange={onChange}
            />
          );
        } else {
          return (
            <RadiosDivider classBlock={classBlock} key={i}>
              {v}
            </RadiosDivider>
          );
        }
      } ) }
    </RadiosContainer>
  );
};

export const Radios: FC<RadiosProps> & {
  Container: FC<RadiosContainerProps>,
  Divider: FC<RadiosDividerProps>,
  Item: FC<RadioProps>
} = Object.assign(RadiosComponent, {
  Container: RadiosContainer,
  Divider: RadiosDivider,
  Item: Radio
});

Radios.displayName = 'Radios';

export default Radios;
