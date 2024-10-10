import type { Location, ParamParseKey, Params, Path, PathMatch, PathPattern, To } from 'react-router';
import { useLocation } from './router';
import { urlParse } from './url-parse';

// Taken from react-router
// MIT License
// Copyright(c) React Training LLC 2015 - 2019 Copyright(c) Remix Software Inc. 2020 - 2021 Copyright(c) Shopify Inc. 2022 -2023
function parsePath(path: string): Partial<Path> {
  let parsedPath: Partial<Path> = {};

  if (path) {
    let hashIndex = path.indexOf("#");
    if (hashIndex >= 0) {
      parsedPath.hash = path.substr(hashIndex);
      path = path.substr(0, hashIndex);
    }

    let searchIndex = path.indexOf("?");
    if (searchIndex >= 0) {
      parsedPath.search = path.substr(searchIndex);
      path = path.substr(0, searchIndex);
    }

    if (path) {
      parsedPath.pathname = path;
    }
  }

  return parsedPath;
}

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
    key: (to && (to as Location).key) || key || ''
  };
  return location;
}

export function warning(cond: any, message: string) {
  if (!cond) {
    // eslint-disable-next-line no-console
    if (typeof console !== "undefined") console.warn(message);

    try {
      // Welcome to debugging history!
      //
      // This error is thrown as a convenience, so you can more easily
      // find the source for a warning that appears in the console by
      // enabling "pause on exceptions" in your JavaScript debugger.
      throw new Error(message);
      // eslint-disable-next-line no-empty
    } catch (e) {}
  }
}

type CompiledPathParam = { paramName: string; isOptional?: boolean };

function compilePath(
  path: string,
  caseSensitive = false,
  end = true
): [RegExp, CompiledPathParam[]] {
  warning(
    path === "*" || !path.endsWith("*") || path.endsWith("/*"),
    `Route path "${path}" will be treated as if it were ` +
      `"${path.replace(/\*$/, "/*")}" because the \`*\` character must ` +
      `always follow a \`/\` in the pattern. To get rid of this warning, ` +
      `please change the route path to "${path.replace(/\*$/, "/*")}".`
  );

  let params: CompiledPathParam[] = [];
  let regexpSource =
    "^" +
    path
      .replace(/\/*\*?$/, "") // Ignore trailing / and /*, we'll handle it below
      .replace(/^\/*/, "/") // Make sure it has a leading /
      .replace(/[\\.*+^${}|()[\]]/g, "\\$&") // Escape special regex chars
      .replace(
        /\/:([\w-]+)(\?)?/g,
        (_: string, paramName: string, isOptional) => {
          params.push({ paramName, isOptional: isOptional != null });
          return isOptional ? "/?([^\\/]+)?" : "/([^\\/]+)";
        }
      );

  if (path.endsWith("*")) {
    params.push({ paramName: "*" });
    regexpSource +=
      path === "*" || path === "/*"
        ? "(.*)$" // Already matched the initial /, just match the rest
        : "(?:\\/(.+)|\\/*)$"; // Don't include the / in params["*"]
  } else if (end) {
    // When matching to the end, ignore trailing slashes
    regexpSource += "\\/*$";
  } else if (path !== "" && path !== "/") {
    // If our path is non-empty and contains anything beyond an initial slash,
    // then we have _some_ form of path in our regex, so we should expect to
    // match only if we find the end of this path segment.  Look for an optional
    // non-captured trailing slash (to match a portion of the URL) or the end
    // of the path (if we've matched to the end).  We used to do this with a
    // word boundary but that gives false positives on routes like
    // /user-preferences since `-` counts as a word boundary.
    regexpSource += "(?:(?=\\/|$))";
  } else {
    // Nothing to match for "" or "/"
  }

  let matcher = new RegExp(regexpSource, caseSensitive ? undefined : "i");

  return [matcher, params];
}

type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

function _matchPath<
  ParamKey extends ParamParseKey<Path>,
  Path extends string
>(
  pattern: PathPattern<Path> | Path,
  pathname: string
): PathMatch<ParamKey> | null {
  if (typeof pattern === "string") {
    pattern = { path: pattern, caseSensitive: false, end: true };
  }

  let [matcher, compiledParams] = compilePath(
    pattern.path,
    pattern.caseSensitive,
    pattern.end
  );

  let match = pathname.match(matcher);
  if (!match) return null;

  let matchedPathname = match[0];
  let pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
  let captureGroups = match.slice(1);
  let params: Params = compiledParams.reduce<Mutable<Params>>(
    (memo, { paramName, isOptional }, index) => {
      // We need to compute the pathnameBase here using the raw splat value
      // instead of using params["*"] later because it will be decoded then
      if (paramName === "*") {
        let splatValue = captureGroups[index] || "";
        pathnameBase = matchedPathname
          .slice(0, matchedPathname.length - splatValue.length)
          .replace(/(.)\/+$/, "$1");
      }

      const value = captureGroups[index];
      if (isOptional && !value) {
        memo[paramName] = undefined;
      } else {
        memo[paramName] = (value || "").replace(/%2F/g, "/");
      }
      return memo;
    },
    {}
  );

  return {
    params,
    pathname: matchedPathname,
    pathnameBase,
    pattern,
  };
}

const matchPath = (currentLocation: Location) => (href: string): PathMatch<any> | null => {
  // Inspired by: https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/modules/NavLink.js#L50
  const targetLocation = createLocation(currentLocation, href, null);
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
    const active = !!(match && queryMatch);

    return active;
  };

  return isActive;
};
