import { FC, Fragment, InputHTMLAttributes, ReactNode, createElement as h, useRef } from 'react';
import { ClassBuilder } from '@not-govuk/component-helpers';
import { Hint } from '@not-govuk/hint';
import { Label } from '@not-govuk/label';

export type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'label'> & {
  classes: ClassBuilder
  conditional?: ReactNode
  hint?: string
  label: string
};

export const Radio: FC<RadioProps> = ({
  classes,
  conditional,
  hint,
  id,
  label,
  ...attrs
}) => {
  const ref = useRef(null);
  const conditionalId = `conditional-${id}`;

  const isChecked = () => ref.current?.checked;

  return (
    <Fragment>
      <div className={classes('item')}>
        <input
          {...attrs}
          id={id}
          className={classes('input')}
          type="radio"
          ref={ref}
          aria-controls={conditional && conditionalId}
          aria-expanded={conditional && !!isChecked()}
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

export default Radio;
