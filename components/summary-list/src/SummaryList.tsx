import { FC, createElement as h } from 'react';
import { SummaryListContainer, SummaryListContainerProps } from './SummaryListContainer';
import { SummaryListItem, SummaryListItemProps } from './SummaryListItem';

import '../assets/SummaryList.scss';

export type SummaryListProps = SummaryListContainerProps & {
  /** Items to be summarised */
  items: SummaryListItemProps[]
};

const SummaryListComponent: FC<SummaryListProps> = ({
  classBlock = 'govuk-summary-list',
  items: _items,
  ...props
}) => {
  const reducer = (acc: boolean, cur: SummaryListItemProps) => acc || !!cur.actions;
  const hasActions = _items.reduce(reducer, false);
  const items = (
    !hasActions
    ? _items
    : _items.map(({ actions, classModifiers, ...rest }) => ({
      actions,
      ...rest,
      classModifiers: (
        actions !== undefined
        ? classModifiers
        : [
          'no-actions',
          ...(
            Array.isArray(classModifiers)
            ? classModifiers
            : [classModifiers]
          )
        ]
      )
    }))
  );

  return (
    <SummaryListContainer {...props} classBlock={classBlock}>
      {items.map((itemProps, i: number) => (
        <SummaryListItem key={i}  {...itemProps} />
      ))}
    </SummaryListContainer>
  );
};

export const SummaryList: FC<SummaryListProps> & {
  Container: FC<SummaryListContainerProps>,
  Item: FC<SummaryListItemProps>
} = Object.assign(SummaryListComponent, { Container: SummaryListContainer, Item: SummaryListItem });

SummaryList.displayName = 'SummaryList';

export default SummaryList;
