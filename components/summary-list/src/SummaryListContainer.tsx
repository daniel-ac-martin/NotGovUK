import { FC, HTMLAttributes, ReactNode, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';

export type SummaryListContainerProps = StandardProps & HTMLAttributes<HTMLDListElement> & {
  children?: ReactNode
};

export const SummaryListContainer: FC<SummaryListContainerProps> = ({
  children,
  classBlock,
  classModifiers,
  className,
  ...attrs
}) => {
  const classes = classBuilder('govuk-summary-list', classBlock, classModifiers, className);

  return (
    <dl {...attrs} className={classes()}>
      {children}
    </dl>
  );
};

SummaryListContainer.displayName = 'SummaryListContainer';

export default SummaryListContainer;
