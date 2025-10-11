import type { FC } from 'react';
import type { Location as _Location } from 'react-router';
import type { LinkProps as _LinkProps } from 'react-router-dom';
import type { NavigateFunction, NavigateOptions, To } from './common';
import { createElement as h } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import _Link from 'next/link';
import { UseIsActive, makeUseIsActive } from './is-active';
import { UseLocation, makeUseLocation } from './location';

export type LinkProps = Omit<_LinkProps, 'relative' | 'reloadDocument' | 'state' | 'unstable_viewTransition'>

export const needSuspense = true;

const _useLocation = () => {
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

export const useNavigate: NavigateFunction = () => {
  const router = useRouter();

  return (to: To | number, options: NavigateOptions = {}) => {
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
};

export const Link: FC<LinkProps> = ({
  to,
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

  return h(_Link, {
    ...attrs,
    href,
    replace,
    scroll: !preventScrollReset
  });
};

export { useParams } from 'next';
