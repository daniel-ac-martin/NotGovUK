import type { Location as _Location } from 'react-router';
import type { LinkProps as _LinkProps } from 'react-router-dom';
import type { Query } from '@not-govuk/uri';

export type Location = _Location & {
  query: Query
};

export type LocationFunction = () => Location;

export type {
  NavigateFunction,
  NavigateOptions,
  To
} from 'react-router';
