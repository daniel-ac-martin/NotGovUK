import { FC, HTMLAttributes, ReactNode, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';
import { Anchor, AnchorList } from "@not-govuk/anchor-list";

import '../assets/SummaryCard.scss';

export type SummaryCardProps = StandardProps & HTMLAttributes<HTMLDivElement> & {
  /** Links to perform status related actions */
  actions?: Anchor[]
  /** Contents */
  children?: ReactNode
  /** Title of the summary card */
  title: string
};

export const SummaryCard: FC<SummaryCardProps> = ({
  actions,
  children,
  classBlock,
  classModifiers,
  className,
  title,
  ...attrs
}) => {
  const classes = classBuilder('govuk-summary-card', classBlock, classModifiers, className);

  return (
    <div {...attrs} className={classes()}>
      <div className={classes('title-wrapper')}>
        <h2 className={classes('title')}>{title}</h2>
        {actions && actions.length && (
          <AnchorList items={actions} classBlock={classes('actions')} />
        )}
      </div>
      <div className={classes('content')}>
        {children}
      </div>
    </div>
  );
};

SummaryCard.displayName = 'SummaryCard';

export default SummaryCard;
