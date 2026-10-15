import { ElementType, FC, HTMLAttributes, ReactNode, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@react-foundry/component-helpers';
import { FormGroup } from '@not-govuk/form-group';

export type CheckboxesContainerProps = StandardProps & Omit<HTMLAttributes<HTMLDivElement>, 'id' | 'label'> & {
  /** The options of the group */
  children?: ReactNode
  /** Error message */
  error?: ReactNode
  /** Hint */
  hint?: ReactNode
  /** HTML id, which the id of the hint is derived from */
  id: string
  /** Label */
  label: ReactNode
  /** Caption for the section the question belongs to, shown above the label */
  labelCaption?: ReactNode
  /** BEM style modifiers to apply to the label */
  labelClassModifiers?: StandardProps['classModifiers']
  /** Component to wrap the label in, making it a heading */
  labelHeading?: ElementType | undefined
};

export const CheckboxesContainer: FC<CheckboxesContainerProps> = ({
  children,
  classBlock,
  classModifiers,
  className,
  error,
  hint,
  id,
  label,
  labelCaption,
  labelClassModifiers,
  labelHeading,
  ...attrs
}) => {
  const classes = classBuilder('govuk-checkboxes', classBlock, classModifiers, className);

  return (
    <FormGroup
      labelHeading={labelHeading}
      id={id}
      label={label}
      labelCaption={labelCaption}
      labelClassModifiers={labelClassModifiers}
      hint={hint}
      hintId={`${id}-hint`}
      error={error}
    >
      <div {...attrs} className={classes()}>
        {children}
      </div>
    </FormGroup>
  );
};

CheckboxesContainer.displayName = 'CheckboxesContainer';

export default CheckboxesContainer;
