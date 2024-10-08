import { Location, PathMatch, To, matchPath as _matchPath, parsePath } from 'react-router';
import { useLocation } from './location';
import { urlParse } from './url-parse';

// Adapted from react-router
// MIT License
// Copyright(c) React Training LLC 2015 - 2019 Copyright(c) Remix Software Inc. 2020 - 2021 Copyright(c) Shopify Inc. 2022 -2023
// https://github.com/remix-run/react-router/blob/9afac15d8cbe30b37d0f9e8b89c9f1e430dfe35a/packages/router/history.ts#L533
function createLocation(
  current: string | Location,
  to: To,
  state: any = null,
  key?: string
): Readonly<Location> {
  let location: Readonly<Location> = {
    pathname: typeof current === 'string' ? current : current.pathname,
    search: '',
    hash: '',
    ...(typeof to === 'string' ? parsePath(to) : to),
    state,
    key: (to && (to as Location).key) || key
  };
  return location;
}

export const matchPath = (currentLocation: Location) => (href: string): PathMatch<any> => {
  // Inspired by: https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/modules/NavLink.js#L50
  const targetLocation = createLocation(currentLocation, href, null, null);
  // Regex taken from: https://github.com/pillarjs/path-to-regexp/blob/master/index.js#L202
  //const target = targetLocation.pathname?.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
  const target = targetLocation.pathname;
  const current = currentLocation.pathname;

  return (
    target
      ? _matchPath({
        caseSensitive: true,
        end: true,
        path: target
      }, current)
      : null
  );
};

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

export const useActive = () => {
  const location = useLocation();
  const matcher = matchPath(location);

  const isActive = (href: string): boolean => {
    const match = matcher(href);
    const queryMatch = includes(
      urlParse(location.search).query,
      urlParse(href).query
    );
    const active = match && queryMatch;

    return active;
  };

  return isActive;
};

export type { PathMatch } from 'react-router';
