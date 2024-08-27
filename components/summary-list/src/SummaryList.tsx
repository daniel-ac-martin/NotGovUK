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
  items,
  ...props
}) => {
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
