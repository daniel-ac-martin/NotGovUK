import { FC, HTMLAttributes, ReactNode, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@react-foundry/component-helpers';

export type TaskListContainerProps = StandardProps & HTMLAttributes<HTMLUListElement> & {
  children?: ReactNode
};

export const TaskListContainer: FC<TaskListContainerProps> = ({
  children,
  classBlock,
  classModifiers,
  className,
  ...attrs
}) => {
  const classes = classBuilder('govuk-task-list', classBlock, classModifiers, className);

  return (
    <ul {...attrs} className={classes()}>
      {children}
    </ul>
  );
};

TaskListContainer.displayName = 'TaskListContainer';

export default TaskListContainer;
