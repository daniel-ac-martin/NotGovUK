import { FC, HTMLAttributes, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@react-foundry/component-helpers';
import { TaskListItem, TaskListItemProps } from './TaskListItem';

import '../assets/TaskList.scss';

export type { TaskListItemProps };

export type TaskListProps = StandardProps & HTMLAttributes<HTMLUListElement> & {
  /** Prefix for the ids of each task's hint and status */
  idPrefix?: string
  /** Tasks to be listed */
  items: TaskListItemProps[]
};

export const TaskList: FC<TaskListProps> = ({
  classBlock,
  classModifiers,
  className,
  idPrefix = 'task-list',
  items,
  ...attrs
}) => {
  const classes = classBuilder('govuk-task-list', classBlock, classModifiers, className);

  return (
    <ul {...attrs} className={classes()}>
      {items.map((item, i: number) => (
        <TaskListItem key={i} {...item} classes={classes} idPrefix={`${idPrefix}-${i + 1}`} />
      ))}
    </ul>
  );
};

TaskList.displayName = 'TaskList';

export default TaskList;
