import type { FC } from 'react';
import type { LinkProps, UseNavigate, UseParams } from './common';
import type { UseIsActive } from './is-active';
import type { UseLocation, _UseLocation } from './location';

import { createElement as h } from 'react';
import { makeUseIsActive } from './is-active';
import { makeUseLocation } from './location';

export const needSuspense = false;

// Set up dummy functions
const _useLocation: _UseLocation = () => ({
  state: undefined,
  key: '',
  pathname: '',
  search: '',
  hash: ''
});
export const useLocation: UseLocation = makeUseLocation(_useLocation);
export const useIsActive: UseIsActive = makeUseIsActive(useLocation);
export const useNavigate: UseNavigate = () => () => undefined;
export const useParams: UseParams = () => ({});
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

export type {
  LinkProps
};
