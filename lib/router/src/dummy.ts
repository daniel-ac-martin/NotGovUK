import type { FC } from 'react';
import type { LinkProps as _LinkProps, Location as _Location } from 'react-router';
import type { NavigateFunction, ParamsFunction } from './common';
import { createElement as h } from 'react';
import { UseIsActive, makeUseIsActive } from './is-active';
import { UseLocation, makeUseLocation } from './location';

export type LinkProps = Omit<_LinkProps, 'relative' | 'reloadDocument' | 'state' | 'unstable_viewTransition'>

export const needSuspense = false;

// Set up dummy functions
const _useLocation = (): _Location => ({
  state: undefined,
  key: '',
  pathname: '',
  search: '',
  hash: ''
});
export const useLocation: UseLocation = makeUseLocation(_useLocation);
export const useIsActive: UseIsActive = makeUseIsActive(useLocation);
export const useNavigate = (): NavigateFunction => () => undefined;
export const useParams = (): ParamsFunction => () => ({});
export const Link: FC<LinkProps> = ({
  to,
  preventScrollReset,
  replace,
  ...attrs
}) => {
  const href = (
    typeof to === 'string'
      ? to
      : (to.pathname || '') + (to.search || '') + (to.hash || '')
  );

  return h('a', {
    ...attrs,
    href
  });
};
