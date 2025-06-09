'use client';

import { FC, Fragment, InputHTMLAttributes, ReactNode, createElement as h, useRef, useState } from 'react';
import { ClassBuilder } from '@not-govuk/component-helpers';
import { Hint } from '@not-govuk/hint';
import { Label } from '@not-govuk/label';

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'label'> & {
  classes: ClassBuilder
  conditional?: ReactNode
  hint?: string
  label: string | ReactNode
};

export const Checkbox: FC<CheckboxProps> = ({
  classes,
  conditional,
  defaultChecked,
  hint,
  id,
  label,
  onChange: _onChange,
  ...attrs
}) => {
  const setState = useState({})[1];
  const forceUpdate = () => setState({});
  const withUpdate = <A, B>(f?: (a: A) => B) => (e: A): B | undefined => {
    forceUpdate();
    return f && f(e);
  };

  const onChange = withUpdate(_onChange);
  const ref = useRef<HTMLInputElement>(null);
  const conditionalId = `conditional-${id}`;

  const isChecked = () => (
    ref.current === null
      ? defaultChecked
      : ref.current.checked
  );

  return (
    <Fragment>
      <div className={classes('item')}>
        <input
          {...attrs}
          id={id}
          className={classes('input')}
          defaultChecked={defaultChecked}
          type="checkbox"
          ref={ref}
          onChange={onChange}
          aria-controls={conditional ? conditionalId : undefined}
          aria-expanded={conditional ? !!isChecked() : undefined}
        />
        <Label htmlFor={id} className={classes('label')}>{label}</Label>
        {hint && <Hint id={`${id}-hint`} className={classes('hint')}>{hint}</Hint>}
      </div>
      { !conditional ? null : (
          <div
            id={conditionalId}
            className={classes('conditional', isChecked() ? undefined : 'hidden')}
          >
            {conditional}
          </div>
      ) }
    </Fragment>
  );
};

export default Checkbox;
