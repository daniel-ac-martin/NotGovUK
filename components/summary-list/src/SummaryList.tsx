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
  const items = _items.map(item => {
    const hasActions = !!item.actions && (
      !Array.isArray(item.actions) || item.actions.length > 0
    );
    return { item, hasActions };
  });
  const someActions = items.some(({ hasActions }) => hasActions);

  return (
    <SummaryListContainer {...props} classBlock={classBlock}>
      {items.map((itemProps, i: number) => {
        // If some items have actions but this one doesn't, add the 'no-actions' modifier
        // https://design-system.service.gov.uk/components/summary-list/#showing-rows-with-and-without-actions
        const classModifiers = someActions && !itemProps.hasActions ? ['no-actions'] : [];

        return <SummaryListItem key={i} {...itemProps.item} classModifiers={classModifiers} />
      })}
    </SummaryListContainer>
  );
};

export const SummaryList: FC<SummaryListProps> & {
  Container: FC<SummaryListContainerProps>,
  Item: FC<SummaryListItemProps>
} = Object.assign(SummaryListComponent, { Container: SummaryListContainer, Item: SummaryListItem });

SummaryList.displayName = 'SummaryList';

export default SummaryList;
