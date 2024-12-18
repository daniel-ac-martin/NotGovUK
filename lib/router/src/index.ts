import type { FC } from 'react';
import type { Location as _Location } from 'react-router';
import type { LinkProps as _LinkProps } from 'react-router-dom';
import type { NavigateFunction, NavigateOptions, To } from './common';
import { createElement as h } from 'react';
import { UseIsActive, makeUseIsActive } from './is-active';
import { UseLocation, makeUseLocation } from './location';

export type LinkProps = Omit<_LinkProps, 'relative' | 'reloadDocument' | 'state' | 'unstable_viewTransition'>

const isDev = globalThis.process?.env?.NODE_ENV === 'development';

// Set up dummy functions
let _useLocation = (): _Location => ({
  state: undefined,
  key: '',
  pathname: '',
  search: '',
  hash: ''
});
let useNavigate = (): NavigateFunction => () => undefined;
let Link: FC<LinkProps> = ({
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
let needSuspense = false;

// Replace dummy functions with react-router when it is available
try {
  ({
    useLocation: _useLocation,
    useNavigate
  } = require('react-router'));
  ({
    Link
  } = require('react-router-dom'));
} catch (_e) {
  // Replace dummy functions with wrappers around Next.js when it is available
  try {
    const { usePathname, useRouter, useSearchParams } = require('next/navigation');
    const _Link = require('next/link');
    console.warn('Deprecated import; please import @not-govuk/router from @not-govuk/router/next when using Next.js.');
    _useLocation = () => {
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
    useNavigate = () => {
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
    Link = ({
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
    needSuspense = true;
  } catch (_e) {
    // We don't seem to have a router library so give up :-(
    // Should we throw an Error here?
    if (isDev) {
      console.warn('Unable to find router library; links will cause page loads and some functionality may break.');
    }
  }
}

export const useLocation: UseLocation = makeUseLocation(_useLocation);
export const useIsActive: UseIsActive = makeUseIsActive(useLocation);

export {
  needSuspense,
  useNavigate,
  Link
};
