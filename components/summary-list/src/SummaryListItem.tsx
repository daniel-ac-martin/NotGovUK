import { FC, HTMLAttributes, ReactNode, createElement as h } from 'react';
import { Anchor, AnchorList } from '@not-govuk/anchor-list';
import { A } from '@not-govuk/link';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';

export type Action = Anchor;

export type SummaryListItemProps = StandardProps & HTMLAttributes<HTMLDivElement> & {
  /** Name or 'key' of the item */
  name: ReactNode | string
  /** Value of the item */
  children: ReactNode
  /** Actions available for the item */
  actions?: Action | Action[]
};

export const SummaryListItem: FC<SummaryListItemProps> = ({
  actions: _actions = [],
  children,
  classBlock,
  classModifiers,
  className,
  name,
  ...attrs
}) => {
  const classes = classBuilder('govuk-summary-list', classBlock);
  const actions = (
    Array.isArray(_actions)
    ? _actions
    : [ _actions ]
  );
  const { children: firstActionChildren, text: firstActionText, ...firstActionProps } = actions[0] || {};

  return (
    <div {...attrs} className={classes('row', classModifiers, className)}>
      <dt className={classes('key')}>
        {name}
      </dt>
      <dd className={classes('value')}>
        {children}
      </dd>
      { actions.length === 0 ? null : (
        <dd className={classes('actions')}>
        { actions.length === 1 ? (
            <A {...firstActionProps}>{firstActionChildren || firstActionText}</A>
          ) : (
            <AnchorList items={actions} classBlock={classes('actions-list')} />
          )
        }
        </dd>
      ) }
    </div>
  );
};

SummaryListItem.displayName = 'SummaryListItem';

export default SummaryListItem;
