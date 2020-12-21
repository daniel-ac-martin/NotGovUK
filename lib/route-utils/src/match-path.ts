import { Location, createLocation } from 'history';
import { match, matchPath as _matchPath } from 'react-router';

export const matchPath = (currentLocation: Location) => (href: string): match => {
  // Inspired by: https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/modules/NavLink.js#L50
  const targetLocation = createLocation(href, null, null, currentLocation);
  // Regex taken from: https://github.com/pillarjs/path-to-regexp/blob/master/index.js#L202
  const target = targetLocation.pathname?.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
  const current = currentLocation.pathname;

  return (
    target
      ? _matchPath(current, {
        exact: true,
        path: target
      })
      : null
  );
};
