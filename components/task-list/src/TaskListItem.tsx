import { FC, HTMLAttributes, ReactNode, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@react-foundry/component-helpers';
import { A } from '@not-govuk/link';

export type TaskListItemProps = StandardProps & Omit<HTMLAttributes<HTMLLIElement>, 'title'> & {
  /** Name of the task */
  title: ReactNode
  /** Link to the task (omit if the task cannot be started yet) */
  href?: string
  /** Additional information about the task */
  hint?: ReactNode
  /** Status of the task, for example a Tag */
  status: ReactNode
  /** BEM style modifiers to apply to the status, for example 'cannot-start-yet' */
  statusClassModifiers?: StandardProps['classModifiers']
};

export const TaskListItem: FC<TaskListItemProps> = ({
  classBlock,
  classModifiers: _classModifiers,
  className,
  hint,
  href,
  id = 'task-list',
  status,
  statusClassModifiers,
  title,
  ...attrs
}) => {
  const classes = classBuilder('govuk-task-list', classBlock);
  const hintId = `${id}-hint`;
  const statusId = `${id}-status`;
  const classModifiers = [
    ...(
      Array.isArray(_classModifiers)
      ? _classModifiers
      : [_classModifiers]
    ),
    href ? 'with-link' : undefined
  ];
  const describedBy = hint ? `${hintId} ${statusId}` : statusId;

  return (
    <li {...attrs} id={id} className={classes('item', classModifiers, className)}>
      <div className={classes('name-and-hint')}>
        { href ? (
          <A className={classes('link')} href={href} aria-describedby={describedBy}>{title}</A>
        ) : (
          <div>{title}</div>
        ) }
        { !hint ? null : (
          <div id={hintId} className={classes('hint')}>{hint}</div>
        ) }
      </div>
      <div id={statusId} className={classes('status', statusClassModifiers)}>
        {status}
      </div>
    </li>
  );
};

TaskListItem.displayName = 'TaskListItem';

export default TaskListItem;
