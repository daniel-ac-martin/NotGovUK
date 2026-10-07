import { FC, HTMLAttributes, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@react-foundry/component-helpers';
import { TaskListItem, TaskListItemProps } from './TaskListItem';

import '../assets/TaskList.scss';

export type { TaskListItemProps };

export type TaskListProps = StandardProps & HTMLAttributes<HTMLUListElement> & {
  /** 'id' for the list, also used to prefix the ids of each task's hint and status */
  id?: string
  /** Tasks to be listed */
  items: TaskListItemProps[]
};

export const TaskList: FC<TaskListProps> = ({
  classBlock,
  classModifiers,
  className,
  items,
  ...attrs
}) => {
  const classes = classBuilder('govuk-task-list', classBlock, classModifiers, className);
  const idPrefix = attrs.id || 'task-list';

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
