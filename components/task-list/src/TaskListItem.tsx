import { FC, HTMLAttributes, ReactNode, createElement as h } from 'react';
import { ClassBuilder, StandardProps } from '@react-foundry/component-helpers';
import { A } from '@not-govuk/link';

export type TaskListItemProps = Omit<StandardProps, 'classBlock' | 'id'> & Omit<HTMLAttributes<HTMLLIElement>, 'id' | 'title'> & {
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

type TaskListItemInternalProps = TaskListItemProps & {
  classes: ClassBuilder
  /** Prefix for the ids of the hint and status */
  idPrefix: string
};

export const TaskListItem: FC<TaskListItemInternalProps> = ({
  classModifiers: _classModifiers,
  className,
  classes,
  hint,
  href,
  idPrefix,
  status,
  statusClassModifiers,
  title,
  ...attrs
}) => {
  const hintId = `${idPrefix}-hint`;
  const statusId = `${idPrefix}-status`;
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
    <li {...attrs} className={classes('item', classModifiers, className)}>
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
