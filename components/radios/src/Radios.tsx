'use client';

import { FC, InputHTMLAttributes, ReactNode, createElement as h, useState } from 'react';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';
import { FormGroup } from '@not-govuk/form-group';
import { Radio } from './Radio';

import '../assets/Radios.scss';

export type Option = {
  conditional?: ReactNode
  disabled?: boolean
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

export type RadiosProps = StandardProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'label'> & {
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

export const Radios: FC<RadiosProps> = ({
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
  const classes = classBuilder('govuk-radios', classBlock, classModifiers, className);
  const id = _id || attrs.name;
  const hintId = `${id}-hint`;
  const setState = useState({})[1];
  const forceUpdate = () => setState({});
  const withUpdate = <A, B>(f: (a: A) => B) => (e: A): B => {
    forceUpdate();
    return f && f(e);
  };

  const onChange = withUpdate(_onChange);

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
                {...rest}
                {...attrs}
                classes={classes}
                defaultChecked={defaultChecked}
                id={optionId}
                key={i}
                onChange={onChange}
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

Radios.displayName = 'Radios';

export default Radios;
