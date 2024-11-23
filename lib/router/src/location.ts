import type { Location as _Location } from 'react-router';
import type { Location, LocationFunction } from './common';
import { qsParse } from '@not-govuk/uri';

export type UseLocation = LocationFunction;
type _LocationFunction = () => _Location;

export const enhanceLocation = (location: _Location): Location => ({
  ...location,
  query: qsParse(location.search)
});

export const makeUseLocation = (useLocation: _LocationFunction): UseLocation => () => {
  return enhanceLocation(useLocation());
};
