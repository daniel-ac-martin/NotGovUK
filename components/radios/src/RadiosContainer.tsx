import { ElementType, FC, HTMLAttributes, ReactNode, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@react-foundry/component-helpers';
import { FormGroup } from '@not-govuk/form-group';

export type RadiosContainerProps = StandardProps & Omit<HTMLAttributes<HTMLDivElement>, 'id' | 'label'> & {
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
  /** BEM style modifiers to apply to the label */
  labelClassModifiers?: StandardProps['classModifiers']
  /** Component to wrap the label in, making it a heading */
  labelHeading?: ElementType
};

export const RadiosContainer: FC<RadiosContainerProps> = ({
  children,
  classBlock,
  classModifiers,
  className,
  error,
  hint,
  id,
  label,
  labelClassModifiers,
  labelHeading,
  ...attrs
}) => {
  const classes = classBuilder('govuk-radios', classBlock, classModifiers, className);

  return (
    <FormGroup
      labelHeading={labelHeading}
      id={id}
      label={label}
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

RadiosContainer.displayName = 'RadiosContainer';

export default RadiosContainer;
