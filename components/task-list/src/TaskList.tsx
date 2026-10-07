import { FC, createElement as h } from 'react';
import { TaskListContainer, TaskListContainerProps } from './TaskListContainer';
import { TaskListItem, TaskListItemProps } from './TaskListItem';

import '../assets/TaskList.scss';

export type { TaskListContainerProps, TaskListItemProps };

export type TaskListProps = TaskListContainerProps & {
  /** Tasks to be listed */
  items: TaskListItemProps[]
};

const TaskListComponent: FC<TaskListProps> = ({
  classBlock = 'govuk-task-list',
  items,
  ...props
}) => {
  const idPrefix = props.id || 'task-list';

  return (
    <TaskListContainer {...props} classBlock={classBlock}>
      {items.map((itemProps, i: number) => (
        <TaskListItem key={i} classBlock={classBlock} id={`${idPrefix}-${i + 1}`} {...itemProps} />
      ))}
    </TaskListContainer>
  );
};

export const TaskList: FC<TaskListProps> & {
  Container: FC<TaskListContainerProps>,
  Item: FC<TaskListItemProps>
} = Object.assign(TaskListComponent, { Container: TaskListContainer, Item: TaskListItem });

TaskList.displayName = 'TaskList';

export default TaskList;
