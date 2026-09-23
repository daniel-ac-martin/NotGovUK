import { FC, Fragment, HTMLAttributes, ReactNode, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@react-foundry/component-helpers';
import { ErrorMessage } from '@not-govuk/error-message';
import { FieldSet, LegendSize } from '@not-govuk/fieldset';
import { Hint } from '@not-govuk/hint';
import { Label } from '@not-govuk/label';

import '../assets/FormGroup.scss';

export type LabelSize = LegendSize;

export type FormGroupProps = StandardProps & Omit<HTMLAttributes<HTMLDivElement>, 'id' | 'label'> & {
  children?: ReactNode
  error?: ReactNode
  errorId?: string
  fieldId?: string
  hint?: ReactNode
  hintId?: string
  id: string
  /** Whether the label (or legend) is the page heading */
  isPageHeading?: boolean
  label: ReactNode
  /** Size of the label (or legend) text */
  labelSize?: LabelSize
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
  isPageHeading = false,
  label,
  labelSize,
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

  return (
    <div id={id} {...attrs} className={classes()}>
      { fieldId ? (
          <Fragment>
            <Label
              classModifiers={labelSize}
              hidden={standalone}
              htmlFor={fieldId}
              isPageHeading={isPageHeading}
            >
              {label}
            </Label>
            {children}
          </Fragment>
        ) : (
          <FieldSet
            aria-describedby={describedBy}
            isPageHeading={isPageHeading}
            legend={label}
            legendSize={labelSize}
          >
            {children}
          </FieldSet>
      ) }
    </div>
  );
};

FormGroup.displayName = 'FormGroup';

export default FormGroup;
