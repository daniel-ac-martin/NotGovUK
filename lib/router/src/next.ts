import type { FC } from 'react';
import type { LinkProps, NavigateFunction, NavigateOptions, To, UseNavigate } from './common';
import type { UseIsActive } from './is-active';
import type { UseLocation, _UseLocation } from './location';

import { createElement as h } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import _Link from 'next/link';
import { makeUseIsActive } from './is-active';
import { makeUseLocation } from './location';

export const needSuspense = true;

const _useLocation: _UseLocation = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = (
    searchParams.size
      ? '?' + searchParams.toString()
      : ''
  );
  const location = {
    state: undefined,
    key: '',
    pathname,
    search,
    hash: ''
  };

  return location;
};

export const useLocation: UseLocation = makeUseLocation(_useLocation);
export const useIsActive: UseIsActive = makeUseIsActive(useLocation);

export const useNavigate: UseNavigate = () => {
  const router = useRouter();
  const navigate: NavigateFunction = (to: To | number, options: NavigateOptions = {}) => {
    if (typeof to === 'number') {
      if (to === -1) {
        router.back();
      }
    } else {
      const href = (
        to === 'string'
          ? to
          : to.toString()
      );
      const nextOptions = {
        scroll: !options.preventScrollReset
      };

      if (options.replace) {
        router.replace(href, nextOptions);
      } else {
        router.push(href, nextOptions);
      }
    }
  };

  return navigate;
};

const prefetchMap: Map<LinkProps['prefetch'], boolean | null> = new Map([
  [ undefined, null ], // We retain Next.js' default behaviour
  [ 'none', false ],
  [ 'intent', true ],
  [ 'render', true ],
  [ 'viewport', true ]
]);

export const Link: FC<LinkProps> = ({
  to,
  prefetch: _prefetch,
  preventScrollReset,
  replace,
  ...attrs
}) => {
  const href = (
    typeof to === 'string'
      ? to
      : {
        ...to,
        hash: (
          to.hash !== '#'
            ? to.hash
            : undefined
        )
      }
  );
  const prefetch = prefetchMap.get(_prefetch);

  return h(_Link, {
    ...attrs,
    href,
    prefetch,
    replace,
    scroll: !preventScrollReset
  });
};

export { useParams } from 'next/navigation';
export type {
  LinkProps
};
