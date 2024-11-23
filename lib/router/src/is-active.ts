import type { LocationFunction } from './common';
import { URI } from '@not-govuk/uri';

const includes = (haystack: object, needle: object): boolean => {
  const subIncludes = (haystack: any, needle: any): boolean => (
    Array.isArray(needle) ? (
      needle.length === haystack.length &&
      needle.reduce(
        (acc, cur, idx) => acc && subIncludes(haystack[idx], cur),
        true
      )
    ) : (
      typeof needle === 'object' ? (
        typeof haystack === 'object' &&
        Object.keys(needle).reduce(
          (acc, cur) => acc && subIncludes(haystack[cur], needle[cur]),
          true
        )
      ) : (
        needle === haystack
      )
    )
  );

  return subIncludes(haystack, needle);
};

export type UseIsActive = () => (href: string) => boolean;

export const makeUseIsActive = (useLocation: LocationFunction): UseIsActive => () => {
  const location = useLocation();

  const isActive = (href: string): boolean => {
    const target = URI.parse(href, location.pathname);
    const pathMatch = (
      target.pathname === '' ||
      location.pathname === target.pathname
    );
    const queryMatch = includes(
      location.query,
      target.query
    );
    const active = !!(pathMatch && queryMatch);

    return active;
  };

  return isActive;
};
