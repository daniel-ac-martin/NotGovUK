'use client';

import { FC, Fragment, createElement as h } from 'react';
import { queryString } from '@not-govuk/uri';
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

const string2Href = (e?: string | NextPrevProps | EnhancedLinkProps) => (
  typeof e === 'string'
  ? { href: e }
  : e
);

const generateLinks = ({
  pageParameter = 'page',
  query = {},
  totalPages = 0
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
    backAndForth: undefined, // Added to satisfy TypeScript v5
    nextText: undefined, // Added to satisfy TypeScript v5
    pageParameter: undefined, // Added to satisfy TypeScript v5
    previousText: undefined, // Added to satisfy TypeScript v5
    query: undefined, // Added to satisfy TypeScript v5
    totalPages: undefined, // Added to satisfy TypeScript v5
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
          ? `${currentIndex} of ${totalPages}`
          : undefined
        ),
        ...(links && links[currentIndex - 1] as object),
        ...(_previous as object)
      }
    )
  );
  const next = (
    currentIndex === undefined
    ? _next
    : (
      currentIndex >= (totalPages || 0) - 1
      ? undefined
      : {
        labelText: `${currentIndex + 2} of ${totalPages}`,
        ...(links && links[currentIndex + 1] as object),
        ...(_next as object)
      }
    )
  );
  const adjacentPages = 1;

  const createLink = (n: number) => {
    const i = n - 1;
    const link = links && links[i];
    const {children, labelText, ...attrs} = (link as EnhancedLinkProps) || {};

    return (
      link === undefined ? null : (
        <PageList.Link key={n} {...attrs} current={currentPage === n}>{n}</PageList.Link>
      )
    );
  };

  const current = currentPage || 0;
  const total = totalPages || 0;

  return (
    <PageList
      classBlock={classBlock}
      classModifiers={classModifiers}
      className={className}
      landmarkLabel={landmarkLabel}
      previous={previous as NextPrevProps}
      next={next as NextPrevProps}
      {...attrs}
    >
      {links === undefined || backAndForth ? undefined : ([
        createLink(1),
        (current - adjacentPages <= 2 ? null : (
          <PageList.Ellipsis key={2} />
        )),

        ...(Array.from(Array(2 * adjacentPages + 1), (_v, i) => {
          const n = current - adjacentPages + i;

          return (
            1 < n && n < total
            ? createLink(n)
            : null
          );
        })),

        (current + adjacentPages >= total - 1 ? null : (
          <PageList.Ellipsis key={total - 1} />
        )),
        createLink(total)
      ])}
    </PageList>
  );
};

Pagination.displayName = 'Pagination';

export default Pagination;
export { PageList };
