import type { LinkProps as _LinkProps, Location as _Location, NavigateFunction } from 'react-router';
import type { Query } from '@not-govuk/uri';

export type LinkProps = Omit<_LinkProps, 'relative' | 'reloadDocument' | 'state' | 'unstable_viewTransition'>

export type Location = _Location & {
  query: Query
};

export type UseLocation = () => Location;
export type UseNavigate = () => NavigateFunction;
export type UseParams = () => Record<string, string | undefined>;

export type {
  NavigateFunction
};
export type {
  NavigateOptions,
  To
} from 'react-router';
