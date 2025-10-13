import type { Location as _Location } from 'react-router';
import type { Location, UseLocation } from './common';
import { qsParse } from '@not-govuk/uri';

export type _UseLocation = () => _Location;

export const enhanceLocation = (location: _Location): Location => ({
  ...location,
  query: qsParse(location.search)
});

export const makeUseLocation = (useLocation: _UseLocation): UseLocation => () => (
  enhanceLocation(useLocation())
);

export type {
  UseLocation,
};
