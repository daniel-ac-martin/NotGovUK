import type { LinkProps as _LinkProps, Location as _Location } from 'react-router';
import type { Query } from '@not-govuk/uri';

export type Location = _Location & {
  query: Query
};

export type LocationFunction = () => Location;
export type ParamsFunction = () => Record<string, string | undefined>;

export type {
  NavigateFunction,
  NavigateOptions,
  To
} from 'react-router';
