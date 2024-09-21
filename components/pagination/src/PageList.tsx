import { FC, Fragment, HTMLAttributes, ReactNode, createElement as h } from 'react';
import { A } from '@not-govuk/link';
import { VisuallyHidden } from '@not-govuk/visually-hidden';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';
import { ItemEllipsis, ItemEllipsisProps } from './ItemEllipsis';
import { ItemLink, ItemLinkProps } from './ItemLink';
import { EnhancedLinkProps } from './common';

export type NextPrevProps = EnhancedLinkProps & {
  /** The link text to the next/previous page. Defaults to 'Next/Previous page', where 'page' is visually hidden. */
  text?: string
};

export type PageListProps = StandardProps & HTMLAttributes<HTMLElement> & {
  /** A list of links (and ellipses) to choose from. */
  children?: ReactNode[]
  /** The label for the navigation landmark that wraps the pagination. */
  landmarkLabel?: string
  /** A link to the next page, if there is a next page. */
  next?: NextPrevProps | string
  /** A link to the previous page, if there is a previous page. */
  previous?: NextPrevProps | string
};

const PageListComponent: FC<PageListProps> = ({
  children,
  classBlock,
  classModifiers = [],
  className,
  landmarkLabel = 'results',
  next: _next,
  previous: _previous,
  ...attrs
}) => {
  const next = (
    typeof _next === 'string'
    ? { href: _next }
    : _next
  );
  const previous = (
    typeof _previous === 'string'
    ? { href: _previous }
    : _previous
  );
  const blockLevel = !children && (next || previous);
  const classes = classBuilder('govuk-pagination', classBlock, [...classModifiers, blockLevel ? 'block' : undefined], className);
  const { labelText: prevLabelText, text: prevText = (<Fragment>Previous<VisuallyHidden> page</VisuallyHidden></Fragment>), ...prevAttrs } = previous || {};
  const { labelText: nextLabelText, text: nextText = (<Fragment>Next<VisuallyHidden> page</VisuallyHidden></Fragment>), ...nextAttrs } = next || {};
  const prevArrow = (
    <svg className={classes('icon', 'prev')} xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
      <path d="m6.5938-0.0078125-6.7266 6.7266 6.7441 6.4062 1.377-1.449-4.1856-3.9768h12.896v-2h-12.984l4.2931-4.293-1.414-1.414z"></path>
    </svg>
  );
  const nextArrow = (
    <svg className={classes('icon', 'next')} xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
      <path d="m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z"></path>
    </svg>
  );

  return (
    <nav {...attrs} className={classes()} aria-label={landmarkLabel}>
      { !previous ? null : (
        <div className={classes('prev')}>
          <A className={classes('link')} {...prevAttrs} rel="prev">
            {prevArrow}
            <span className={classes('link-title', blockLevel && !prevLabelText ? 'decorated' : undefined)}>{prevText}</span>
            { !blockLevel || !prevLabelText ? null : (
              <Fragment>
                <VisuallyHidden>:</VisuallyHidden>
                <span className={classes('link-label')}>{prevLabelText}</span>
              </Fragment>
            ) }
          </A>
        </div>
      ) }
      { !children ? null : (
        <ul className={classes('list')}>
          {children}
        </ul>
      ) }
      { !next ? null : (
        <div className={classes('next')}>
          <A className={classes('link')} {...nextAttrs} rel="next">
            { !blockLevel ? null : nextArrow }
            <span className={classes('link-title', blockLevel && !nextLabelText ? 'decorated' : undefined)}>{nextText}</span>
            { !blockLevel || !nextLabelText ? null : (
              <Fragment>
                <VisuallyHidden>:</VisuallyHidden>
                <span className={classes('link-label')}>{nextLabelText}</span>
              </Fragment>
            ) }
            { blockLevel ? null : nextArrow }
          </A>
        </div>
      ) }
    </nav>
  );
};

export const PageList: FC<PageListProps> & {
  Link: FC<ItemLinkProps>,
  Ellipsis: FC<ItemEllipsisProps>
} = Object.assign(PageListComponent, { Link: ItemLink, Ellipsis: ItemEllipsis });

PageList.displayName = 'PageList';

export default PageList;
