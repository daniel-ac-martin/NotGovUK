import { Location as _Location, UNSAFE_LocationContext as RRContext } from 'react-router';
import { useContext } from 'react';
import { parse as qsParse } from './query-string';

export type Location = _Location & {
  query: object
};

export const enhanceLocation = (location: _Location): Location => ({
  ...location,
  query: qsParse(location.search)
});

export const useLocation = (): Location => {
  const rrLocation = useContext(RRContext)?.location;
  const location = (
    rrLocation
    ? {
      ...rrLocation,
      source: 'react-router'
    }
    : {}
  );

  return enhanceLocation(location);
};
