import { FC, HTMLAttributes, ReactNode, createElement as h } from 'react';
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
  ...attrs
}) => {
  const classes = classBuilder('govuk-radios', classBlock, classModifiers, className);

  return (
    <FormGroup
      id={id}
      label={label}
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
