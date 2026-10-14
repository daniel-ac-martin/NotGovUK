import { ElementType, FC, Fragment, HTMLAttributes, ReactNode, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@react-foundry/component-helpers';
import { ErrorMessage } from '@not-govuk/error-message';
import { FieldSet } from '@not-govuk/fieldset';
import { Hint } from '@not-govuk/hint';
import { Label } from '@not-govuk/label';

import '../assets/FormGroup.scss';

// The size a heading gives the label, as Label and FieldSet size it themselves
const headingModifiers: Record<string, string> = { h1: 'l', h2: 'm', h3: 's', h4: 's', h5: 's', h6: 's' };

// Caption sizes pair one-to-one with the label's, except that there is no small one
const captionModifiers: Record<string, string> = { xl: 'xl', l: 'l', m: 'm', s: 'm' };

export type FormGroupProps = StandardProps & Omit<HTMLAttributes<HTMLDivElement>, 'id' | 'label'> & {
  children?: ReactNode
  error?: ReactNode
  errorId?: string
  fieldId?: string
  hint?: ReactNode
  hintId?: string
  id: string
  label: ReactNode
  /** Caption for the section the question belongs to, shown above the label */
  labelCaption?: ReactNode
  /** BEM style modifiers to apply to the label (or legend) */
  labelClassModifiers?: StandardProps['classModifiers']
  /** Component to wrap the label (or legend) in, making it a heading */
  labelHeading?: ElementType
  standalone?: boolean
};

export const FormGroup: FC<FormGroupProps> = ({
  children: _children,
  classBlock,
  classModifiers: _classModifiers = [],
  className,
  error,
  errorId: _errorId,
  fieldId,
  hint,
  hintId: _hintId,
  id,
  label,
  labelCaption,
  labelClassModifiers,
  labelHeading,
  standalone = false,
  ...attrs
}) => {
  const classModifiers = [
    error ? 'error' : undefined,
    standalone ? 'standalone' : undefined,
    ...(Array.isArray(_classModifiers) ? _classModifiers : [_classModifiers])
  ];
  const classes = classBuilder('govuk-form-group', classBlock, classModifiers, className);
  const hintId = _hintId || `${id}-hint`;
  const errorId = _errorId || `${id}-error`;
  const describedBy = ([
    hint && hintId,
    error && errorId
  ]
    .filter(e => e)
    .join(' ') || undefined
  );

  const children = (
    <Fragment>
      { !hint ? null : <Hint id={hintId} hidden={standalone}>{hint}</Hint> }
      { !error ? null : <ErrorMessage id={errorId} hidden={standalone}>{error}</ErrorMessage> }
      {_children}
    </Fragment>
  );

  const labelModifier = (
    (typeof labelClassModifiers === 'string' && labelClassModifiers) ||
    (typeof labelHeading === 'string' && headingModifiers[labelHeading])
  );
  const captionModifier = captionModifiers[labelModifier as string] ?? 'm';

  return (
    <div id={id} {...attrs} className={classes()}>
      { !labelCaption ? null : <span className={`govuk-caption-${captionModifier}`}>{labelCaption}</span> }
      { fieldId ? (
          <Fragment>
            <Label
              classModifiers={labelClassModifiers}
              heading={labelHeading}
              hidden={standalone}
              htmlFor={fieldId}
            >
              {label}
            </Label>
            {children}
          </Fragment>
        ) : (
          <FieldSet
            aria-describedby={describedBy}
            legendHeading={labelHeading}
            legend={label}
            legendClassModifiers={labelClassModifiers}
          >
            {children}
          </FieldSet>
      ) }
    </div>
  );
};

FormGroup.displayName = 'FormGroup';

export default FormGroup;
