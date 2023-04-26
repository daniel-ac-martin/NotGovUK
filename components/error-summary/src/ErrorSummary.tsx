import { FC, ReactNode, createElement as h } from 'react';
import { Anchor, AnchorList, AnchorListProps } from '@not-govuk/anchor-list';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';

import '../assets/ErrorSummary.scss';

export type Error = Anchor;

export type ErrorSummaryProps = StandardProps & Pick<AnchorListProps, 'items'> & {
  /** The heading of the error summary block. */
  title?: ReactNode[] | string
};

export const ErrorSummary: FC<ErrorSummaryProps> = ({
  children,
  classBlock,
  classModifiers,
  className,
  items,
  title = 'There is a problem ',
  ...attrs
}) => {
  const classes = classBuilder('govuk-error-summary', classBlock, classModifiers, className);

  return (
    <div {...attrs} className={classes()} data-module="govuk-error-summary">
      <div role="alert">
        <h2 className={classes('title')}>{title}</h2>
        <div className={classes('body')}>
          <AnchorList as="ul" items={items} classBlock={classes('list')} className="govuk-list" />
        </div>
      </div>
    </div>
  );
};

ErrorSummary.displayName = 'ErrorSummary';

export default ErrorSummary;
