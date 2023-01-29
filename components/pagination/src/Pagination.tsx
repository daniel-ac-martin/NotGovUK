import { FC, Fragment, createElement as h } from 'react';
import { queryString } from '@not-govuk/route-utils';
import { NextPrevProps, PageList, PageListProps } from './PageList';
import { EnhancedLinkProps } from './common';

import '../assets/Pagination.scss';

type BackForthProps = {
  /** The current page being viewed */
  currentPage?: number
  /** A link to the next page, if there is a next page. */
  next?: NextPrevProps | string
  /** A link to the previous page, if there is a previous page. */
  previous?: NextPrevProps | string
  /** The total number of pages */
  totalPages?: number
};

type ListProps = {
  /** List of all links to paginate through, in order */
  links: (EnhancedLinkProps | string)[]
};

type LinkGeneratorProps = {
  /** Query parameter to use for the page number */
  pageParameter?: string
  /** Query object of the current page, to append to */
  query?: object
  /** The total number of pages */
  totalPages: number
};

type NumberedProps = (ListProps | LinkGeneratorProps) & {
  /** Whether to only show next and previous links */
  backAndForth?: boolean
  /** The current page being viewed */
  currentPage: number
  /** A link to the next page, if there is a next page. */
  nextText?: string
  /** A link to the previous page, if there is a previous page. */
  previousText?: string
};

export type PaginationProps = Omit<PageListProps, 'children' | 'next' | 'previous'> & (
  BackForthProps | NumberedProps
);

const string2Href = e => (
  typeof e === 'string'
  ? { href: e }
  : e
);

const generateLinks = ({
  pageParameter = 'page',
  query = {},
  totalPages
}) => Array.from(
  Array(totalPages),
  (_v, i): EnhancedLinkProps => ({
    href: queryString({ ...query, [pageParameter]: i + 1 }),
    labelText: `${i + 1} of ${totalPages}`
  })
);

export const Pagination: FC<PaginationProps> = ({
  classBlock,
  classModifiers,
  className,
  currentPage,
  landmarkLabel = 'results',
  ...rest
}) => {
  const currentIndex = (
    currentPage === undefined
    ? undefined
    : currentPage - 1
  );
  const {
    backAndForth = false,
    links = undefined,
    next: _next = undefined,
    nextText: _nextText = undefined,
    pageParameter = undefined,
    previous: _previous = undefined,
    previousText: _previousText = undefined,
    query = undefined,
    totalPages = undefined,
    ...attrs
  } = {
    ...rest,
    next: (
      'nextText' in rest
      ? { text: rest.nextText }
      : 'next' in rest && string2Href(rest.next)
    ),
    previous: (
      'previousText' in rest
      ? { text: rest.previousText }
      : 'previous' in rest && string2Href(rest.previous)
    ),
    ...(
      'links' in rest
      ? {
        links: rest.links.map(string2Href),
        totalPages: rest.links.length
      }
      : {
        links: (
          'totalPages' in rest && !('next' in rest || 'previous' in rest) && !('backAndForth' in rest && rest.backAndForth)
          ? generateLinks({
            totalPages: rest.totalPages,
            ...rest
          })
          : undefined
        )
      }
    )
  };

  const previous = (
    currentIndex === undefined
    ? _previous
    : (
      currentIndex <= 0
      ? undefined
      : {
        labelText: (
          totalPages !== undefined
          ? `${currentPage - 1} of ${totalPages}`
          : undefined
        ),
        ...(links && links[currentIndex - 1]),
        ..._previous
      }
    )
  );
  const next = (
    currentIndex === undefined
    ? _next
    : (
      currentPage >= totalPages
      ? undefined
      : {
        labelText: `${currentPage + 1} of ${totalPages}`,
        ...(links && links[currentIndex + 1]),
        ..._next
      }
    )
  );
  const adjacentPages = 1;

  const createLink = (n: number) => {
    const i = n - 1;
    const link = links[i];
    const {children, labelText, ...attrs} = link || {};

    return (
      link === undefined ? null : (
        <PageList.Link key={n} {...attrs} current={currentPage === n}>{n}</PageList.Link>
      )
    );
  };

  return (
    <PageList
      classBlock={classBlock}
      classModifiers={classModifiers}
      className={className}
      landmarkLabel={landmarkLabel}
      previous={previous}
      next={next}
      {...attrs}
    >
      {links === undefined || backAndForth ? null : ([
        createLink(1),
        (currentPage - adjacentPages <= 2 ? null : (
          <PageList.Ellipsis key={2} />
        )),

        ...(Array.from(Array(2 * adjacentPages + 1), (_v, i) => {
          const n = currentPage - adjacentPages + i;

          return (
            1 < n && n < totalPages
            ? createLink(n)
            : null
          );
        })),

        (currentPage + adjacentPages >= totalPages - 1 ? null : (
          <PageList.Ellipsis key={totalPages - 1} />
        )),
        createLink(totalPages)
      ])}
    </PageList>
  );
};

Pagination.displayName = 'Pagination';

export default Pagination;
export { PageList };
