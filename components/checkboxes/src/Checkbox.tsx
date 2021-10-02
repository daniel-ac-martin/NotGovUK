import { FC, Fragment, InputHTMLAttributes, ReactNode, createElement as h, useRef, useState } from 'react';
import { ClassBuilder } from '@not-govuk/component-helpers';
import { Hint } from '@not-govuk/hint';
import { Label } from '@not-govuk/label';

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'label'> & {
  classes: ClassBuilder
  conditional?: ReactNode
  hint?: string
  label: string
};

export const Checkbox: FC<CheckboxProps> = ({
  children,
  classes,
  conditional,
  hint,
  id,
  label,
  onChange: _onChange,
  ...attrs
}) => {
  const setState = useState({})[1];
  const forceUpdate = () => setState({});
  const withUpdate = <A, B>(f: (a: A) => B) => (e: A): B => {
    forceUpdate();
    return f && f(e);
  };

  const onChange = withUpdate(_onChange);
  const ref = useRef(null);
  const conditionalId = `conditional-${id}`;

  return (
    <Fragment>
      <div className={classes('item')}>
        <input
          {...attrs}
          id={id}
          className={classes('input')}
          type="checkbox"
          ref={ref}
          onChange={onChange}
          data-aria-controls={conditional && conditionalId}
        />
        <Label htmlFor={id} className={classes('label')}>{label}</Label>
        {hint && <Hint id={`${id}-hint`} className={classes('hint')}>{hint}</Hint>}
      </div>
      { !conditional ? null : (
          <div
            id={conditionalId}
            className={classes('conditional', ref.current?.checked ? undefined : 'hidden')}
          >
            {conditional}
          </div>
      ) }
    </Fragment>
  );
};

export default Checkbox;
