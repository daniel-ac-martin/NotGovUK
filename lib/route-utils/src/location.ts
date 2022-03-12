import { Location as _Location, LocationState } from 'history';
import { useLocation as useRawLocation } from 'react-router';
import { parse as qsParse } from './query-string';

export type Location<S = LocationState> = _Location<S> & {
  query: object
};

export const enhanceLocation = <S>(location: _Location<S>): Location<S> => ({
  ...location,
  query: qsParse(location.search)
});

export const useLocation = (): Location<object> => {
  const location = useRawLocation();

  return enhanceLocation(location as _Location<object>);
};
