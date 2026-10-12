'use client';

import { FC, Fragment, InputHTMLAttributes, ReactNode, createElement as h, useRef } from 'react';
import { StandardProps, classBuilder } from '@react-foundry/component-helpers';
import { Hint } from '@not-govuk/hint';
import { Label } from '@not-govuk/label';

export type RadioProps = StandardProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'content' | 'label'> & {
  /** Content to render only when the option is selected */
  conditional?: ReactNode
  /** Content for the option, rendered outside of its label */
  content?: ReactNode
  /** Hint for the option */
  hint?: string
  /** Label for the option */
  label: ReactNode
};

export const Radio: FC<RadioProps> = ({
  'aria-describedby': ariaDescribedBy,
  classBlock,
  classModifiers,
  className,
  conditional,
  content,
  defaultChecked,
  hint,
  id,
  label,
  ...attrs
}) => {
  const classes = classBuilder('govuk-radios', classBlock);
  const ref = useRef<HTMLInputElement>(null);
  const conditionalId = `conditional-${id}`;
  const hintId = `${id}-hint`;
  const describedBy = [ariaDescribedBy, hint && hintId].filter(e => e).join(' ') || undefined;

  const isChecked = () => (
    ref.current === null
      ? defaultChecked
      : ref.current.checked
  );

  return (
    <Fragment>
      <div className={classes('item', classModifiers, className)}>
        <input
          {...attrs}
          id={id}
          className={classes('input')}
          defaultChecked={defaultChecked}
          type="radio"
          ref={ref}
          aria-describedby={describedBy}
          aria-controls={conditional ? conditionalId : undefined}
          aria-expanded={conditional ? !!isChecked() : undefined}
        />
        <Label htmlFor={id} className={classes('label')}>{label}</Label>
        {hint && <Hint id={hintId} className={classes('hint')}>{hint}</Hint>}
        {content && <div className={classes('content')}>{content}</div>}
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
