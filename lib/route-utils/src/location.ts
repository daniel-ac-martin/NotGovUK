import { Location as _Location, useLocation as _useLocation } from 'react-router';
import { parse as qsParse } from './query-string';

export type Location = _Location & {
  query: object
};

export const enhanceLocation = (location: _Location): Location => ({
  ...location,
  query: qsParse(location.search)
});

export const useLocation = (): Location => {
  const location = _useLocation();

  return enhanceLocation(location);
};
